import {
  BroadCast,
  ChatBroadCast,
  CombinedIdeaResponse,
  CommentResponse,
  FinalDecisionResponse,
  IdeaResponse,
  SysEventBroadcast,
  Vote,
} from "./ws-data-contracts";
import { useIdeaStore } from "../store/ideaStore";
import { useChatStore } from "../store/chatStore";
import { useSessionStore } from "../store/sessionStore";
import { useCommentStore } from "../store/commentStore";
import { useFinalDecisionStore } from "../store/finalDecisionStore";
import { storeUser, useUserStore } from "@/store/userStore";
import { useToastStore } from "@/store/toastStore";
import { useWsStore } from "@/store/wsStore";

export const messageHandler = (data: BroadCast) => {
  switch (data.type) {
    case "chat": {
      const message = data.content as ChatBroadCast;

      if (message.user_id == null) {
        useToastStore.setState((state) => {
          state.title = "Session info";
          state.description = message.msg;
          state.variant = "destructive";
        });
      } else {
        useChatStore.setState((state) => {
          state.sessionMessages.push(message);
        });
      }
      break;
    }
    case "idea": {
      const idea = data.content as IdeaResponse;
      switch (idea.idea_type) {
        case "refined": {
          if (!idea.deleted) {
            useIdeaStore.setState((state) => {
              state.refinedIdeas.push(idea.idea_id);
            });
          }
          break;
        }
        case "expended": {
          useIdeaStore.setState((state) => {
            state.expendedIdeas.push(idea.idea_id);
          });
          break;
        }
      }

      useIdeaStore.setState((state) => {
        state.ideas.set(idea.idea_id, idea);
        state.roundIdeas[
          useUserStore.getState().userList.indexOf(idea.submitter_id)
        ] = idea.idea_id;
      });

      break;
    }
    case "combined_idea": {
      const combinedIdea = data.content as CombinedIdeaResponse;
      const combinedIdeasMap = useIdeaStore.getState().combinedIdeas;

      let sourceIdeas: number[];
      if (combinedIdeasMap.has(combinedIdea.combined_idea_id)) {
        sourceIdeas = [
          ...(combinedIdeasMap.get(combinedIdea.combined_idea_id) as number[]),
        ];
        sourceIdeas.push(combinedIdea.source_idea_id);
      } else {
        sourceIdeas = [combinedIdea.source_idea_id];
      }
      useIdeaStore.setState((state) => {
        state.combinedIdeas.set(combinedIdea.combined_idea_id, sourceIdeas);
      });
      break;
    }
    case "comment": {
      const comment = data.content as CommentResponse;
      const commentsMap = useCommentStore.getState().comments;

      let ideaComments: CommentResponse[];
      if (commentsMap.has(comment.idea_id)) {
        ideaComments = [
          ...(commentsMap.get(comment.idea_id) as CommentResponse[]),
        ];
        ideaComments.push(comment);
      } else {
        ideaComments = [comment];
      }

      useCommentStore.setState((state) => {
        state.comments.set(comment.idea_id, ideaComments);
      });
      break;
    }
    case "vote": {
      const ideaId = (data.content as Vote).idea_id;
      const idea = {
        ...(useIdeaStore.getState().ideas.get(ideaId) as IdeaResponse),
      };
      idea.votes += 1;
      useIdeaStore.setState((state) => {
        state.ideas.set(ideaId, idea);
      });

      break;
    }

    case "sys_event": {
      handleSysEvent(data.content as SysEventBroadcast);
      break;
    }
    case "final_decision": {
      const finalDecision = data.content as FinalDecisionResponse;

      useFinalDecisionStore.setState((state) => {
        state.finalDecisions.set(finalDecision.idea_id, finalDecision);
      });
      break;
    }
  }
};

const handleSysEvent = async (event: SysEventBroadcast) => {
  switch (event.event) {
    case "start": {
      const colors = useUserStore.getState().predefinedColors;
      const users = useUserStore.getState().userList;

      users.forEach((userId, index) => {
        useUserStore.setState((state) => {
          state.colors.set(userId, colors[index]);
        });
      });

      // Set default values user0 and idea0
      useUserStore.setState((state) => {
        state.colors.set(0, "gray");
      });
      useIdeaStore.setState((state) => {
        state.ideas.set(0, {
          content: "",
          details: null,
          parent_idea_id: null,
          submitter_id: 0,
          session_id: 0,
          idea_id: 0,
          creation_date: "",
          votes: 0,
          deleted: true,
          idea_type: "",
        });
      });

      useSessionStore.setState((state) => {
        state.started = true;
      });

      useIdeaStore.setState((state) => {
        state.roundIdeas = new Array(users.length).fill(0);
      });

      useToastStore.setState((state) => {
        state.title = "Sys Event";
        state.description = "Session started!";
        state.variant = "";
      });
      break;
    }
    case "join": {
      useUserStore.setState((state) => {
        state.userList.push(event.users[0]);
      });
      const user = await storeUser(event.users[0]);
      useToastStore.setState((state) => {
        state.title = "Session info";
        state.description = user.name + " joined the session";
        state.variant = "";
      });
      break;
    }
    case "joined": {
      for (let i = 0; i < event.users.length; i++) {
        useUserStore.setState((state) => {
          state.userList.push(event.users[i]);
        });
        storeUser(event.users[i]);
      }
      break;
    }
    case "quit": {
      const sessionStarted = useSessionStore.getState().started;
      if (!sessionStarted) {
        useUserStore.setState((state) => {
          const index = state.userList.indexOf(event.users[0]);
          if (index > -1) {
            state.userList.splice(index, 1);
          }
        });
      }

      const user = useUserStore.getState().users.get(event.users[0]);
      useToastStore.setState((state) => {
        state.title = "Session info";
        state.description = user?.name + " left the session";
        state.variant = "";
      });
      break;
    }
    case "close": {
      useWsStore.getState().ws?.ws?.close();
      useToastStore.setState((state) => {
        state.title = "Sys Event";
        state.description = "Session ended!";
        state.variant = "";
      });
      setTimeout(() => {
        document.location.reload();
      }, 1000);
      break;
    }
    case "next": {
      useSessionStore.setState((state) => {
        state.currentStep++;
      });
      useToastStore.setState((state) => {
        state.title = "Sys Event";
        state.description = "Next step";
        state.variant = "";
      });
      break;
    }
  }
};

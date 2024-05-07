import WSClient from "@/apiClient/ws";
import {
  BroadCast,
  ChatBroadCast,
  CombinedIdeaResponse,
  FinalDecisionResponse,
  SysEventBroadcast,
  Vote,
} from "@/apiClient/ws-data-contracts";
import {
  CommentResponse,
  IdeaResponse,
  ProjectDisplay,
  SessionResponse,
  UserResponse,
} from "@/apiClient/data-contracts";
import { ReactElement, useState, useEffect } from "react";
import Brainstorming from "./Brainstorming.tsx";
import v1Client, { getAccessToken } from "@/apiClient";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import QueuePage from "./QueuePage.tsx";
import Essaibutton from "@/ChatInSessions.tsx";
import { log } from "console";

interface SessionProps {
  metadata: SessionResponse;
  project: ProjectDisplay;
}

const OpenSession = (props: SessionProps) => {
  const navigate = useNavigate();
  const [mods, setMods] = useState<number[]>([]); // list of mods
  const [userId, setUserId] = useState<number>(0); // current user
  ///////////////////////
  //////////////////////
  const [users, setUsers] = useState<Map<number, UserResponse>>(new Map());
  const [usersList, setUsersList] = useState<number[]>([]); // a list of session usrers
  const [ideas, setIdeas] = useState<Map<number, IdeaResponse>>(new Map());
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [colors, setColors] = useState<Map<number, string>>(new Map());
  const [ideaMatrix, setIdeaMatrix] = useState<number[][]>([[]]);
  const [refinedIdeas, setRefinedIdeas] = useState<number[]>([]);
  const [expandedIdeas, setExpandedIdeas] = useState<number[]>([]);
  const [combinedIdeas, setCombinedIdeas] = useState<CombinedIdeaResponse[]>(
    []
  );
  const [sessionMessages, setSessionMessages] = useState<ChatBroadCast[]>([]);
  const [botMessages, setSBotMessages] = useState<ChatBroadCast[]>([]);

  const [finalDecisions, setFinalDecisions] = useState<FinalDecisionResponse[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const [started, setStarted] = useState<boolean>(false);
  const [steps, setSteps] = useState<ReactElement[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(false);
  const enventHanlder = (data: BroadCast) => {
    // TODO: chat, combined_idea, final_decision
    console.log(data);

    switch (data.type) {
      case "chat":
        sessionMessages.push(data.content as ChatBroadCast);
        setSessionMessages(sessionMessages);
        console.log(sessionMessages);

        break;
      case "idea": {
        const ideaId = (data.content as IdeaResponse).idea_id;
        const existed = ideas.has(ideaId);
        ideas.set(ideaId, data.content as IdeaResponse);
        setIdeas(ideas);
        if (currentStep != 0) {
          if (existed && !(data.content as IdeaResponse).deleted) {
            const newRefinedIdeas = [...refinedIdeas];
            newRefinedIdeas.push(ideaId);
            setRefinedIdeas(newRefinedIdeas);
          } else {
            const newExpandedIdeas = [...expandedIdeas];
            newExpandedIdeas.push(ideaId);
            setExpandedIdeas(newExpandedIdeas);
          }
        }
        break;
      }
      case "combined_idea":
        combinedIdeas.push(data.content as CombinedIdeaResponse);
        setCombinedIdeas(combinedIdeas);
        break;
      case "comment": {
        comments.push(data.content as CommentResponse);
        setComments(comments);
        break;
      }
      case "vote": {
        const idea = ideas.get((data.content as Vote).idea_id) as IdeaResponse;
        if (idea.votes == null) {
          idea.votes = 0;
        }
        idea.votes++;
        ideas.set((data.content as Vote).idea_id, idea);
        setIdeas(ideas);
        break;
      }

      case "sys_event": {
        handleSysEvent(data.content as SysEventBroadcast);
        break;
      }
      case "final_decision": {
        finalDecisions.push(data.content as FinalDecisionResponse);
        setFinalDecisions(finalDecisions);
        break;
      }
    }
  };

  const addUser = async (userId: number): Promise<UserResponse | undefined> => {
    try {
      // Check if the user is already in the users map
      setLoad(true);
      if (users.has(userId)) {
        console.log("index: ", usersList.indexOf(userId));

        if (usersList.indexOf(userId) < 0) {
          console.log("gerwougfresh");

          usersList.push(userId);
          setUsersList(usersList);
        }
        return users.get(userId);
      }

      // Fetch user data using v1Client
      const res = await v1Client.getUserByIdV1UserUserIdGet(userId);
      const userData = res.data;

      setUsers(users.set(userId, res.data));

      usersList.push(userId);
      setUsersList(usersList);

      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Unable to retrieve user data");
    } finally {
      console.log("users");
      console.log(usersList);

      setLoad(false);
    }
  };

  const handleSysEvent = async (event: SysEventBroadcast) => {
    console.log(event);

    switch (event.event) {
      case "start": {
        const colorList = [
          "#cdfc93",
          "#ffb1b1",
          "#fff9c4",
          "#b3e5fc",
          "#f8bbd0",
          "#e1bee7",
        ];

        // usersList.forEach((userId, index) => {
        //   colors.set(userId, colorList[index]); // Update the color for each user ID
        // });
        let i = 0;
        users.forEach((user) => {
          colors.set(user.id, colorList[i]);
          setColors(colors); // Update the colors state with the new Map
          i++;
        });
        setStarted(true);
        break;
      }
      case "join": {
        const userId = event.users[0];
        const user = await addUser(userId);
        toast({
          title: "Session Info",
          //@ts-ignore
          description: user.name + " joined the session!",
        });
        break;
      }
      case "joined": {
        if (event.users.length == 1) {
          const usertest = await addUser(event.users[0]);
          console.log(usertest);
        } else {
          for (let userId of event.users) {
            await addUser(userId);
          }
        }
        break;
      }
      case "quit": {
        const user = users.get(event.users[0]);
        toast({
          title: "Session Info",
          description: (user as UserResponse).name + " left the session!",
        });
        if (!started) {
          const index = usersList.indexOf(event.users[0]);
          if (index > -1) {
            setUsersList(usersList.slice(index, 1));
          }
          users.delete(event.users[0]);
          setUsers(users);
        }
        break;
      }
      case "close": {
        ws.disconnet();
        navigate("/");
        navigate(0);
        break;
      }
      case "next": {
        setCurrentStep(currentStep + 1);
        break;
      }
    }
  };
  const [ws, setWs] = useState<WSClient>(
    new WSClient(props.metadata.session_id, enventHanlder)
  );

  useEffect(() => {
    async function setup() {
      const res = await v1Client.currentV1UserCurrentGet();
      setUserId(res.data.id);

      setUsers(users.set(res.data.id, res.data));

      // init mods list
      let mods: number[] = [];
      // props.project.participants?.filter(user => {user.role == "moderator"}).map(user => {tmp.push(user.user.user_id)}) // mods
      mods.push(props.project.owner_id); // the Admin
      setMods(mods);

      // init steps
      switch (props.metadata.ideation_technique) {
        case "brain_writing": {
          const BWProps = {
            metadata: props.metadata,
            users: users,
            usersList: usersList,
            ideas: ideas,
            colors: colors,
            comments: comments,
            handleComment: (comment: string, ideaId: number) => {
              ws.sendComment(ideaId, comment);
            },
            handleIdea: (
              content: string,
              details: string,
              parent_idea_id: number | null
            ) => {
              ws.sendIdea(content, details, parent_idea_id);
            },
            handlePhaseEnd: () => {
              setCurrentStep(currentStep + 1);
            },
            handleRoundEnd: () => {
              // TODO: build the matrix
            },
          };

          setSteps([
            // TODO: add the steps
          ]);
          break;
        }

        case "brain_storming": {
          const BSProps = {
            metadata: props.metadata,
            users: users,
            colors: colors,
            handleComment: (comment: string, ideaId: number) => {
              ws.sendComment(ideaId, comment);
            },
            handleIdea: (content: string, details: string) => {
              ws.sendIdea(content, details, null);
            },
            handlePhaseEnd: () => {
              let rows = Math.sqrt(ideas.size);
              if (!Number.isInteger(rows)) {
                rows = Math.trunc(rows) + 1;
              }

              let i = 0;
              let j = 0;

              ideas.forEach((_, key) => {
                ideaMatrix[i][j] = key;
                j++;
                if (j >= rows) {
                  j = 0;
                  i++;
                }
              });

              setIdeaMatrix(ideaMatrix);
              setCurrentStep(currentStep + 1);
            },
          };

          setSteps([
            <Brainstorming
              {...BSProps}
              ideas={ideas}
              comments={comments}
            ></Brainstorming>,
            // TODO: add other steps
          ]);
          break;
        }
      }

      ws.connect(getAccessToken() as string);
    }
    setup();
  }, []);

  const queueProps = {
    metadata: props.metadata,
    handleStart: () => {
      ws.startSession();
    },
  };

  const chatProps = {
    handleSessionMessage: (msg: string) => ws.sendMessage(msg),
    handleBotMessage: (msg: string) => {},
  };
  return (
    <>
      {started ? (
        steps[currentStep]
      ) : (
        <QueuePage
          {...queueProps}
          users={users}
          isMod={mods.indexOf(userId) >= 0}
          usersList={usersList}
          load={load}
        />
      )}
      <Essaibutton
        {...chatProps}
        userId={userId}
        users={users}
        sessionMessages={sessionMessages}
        botMessages={botMessages}
      />
    </>
  );
};

export default OpenSession;

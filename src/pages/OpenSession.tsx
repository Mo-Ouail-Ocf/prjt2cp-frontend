import { ProjectDisplay, SessionResponse } from "@/apiClient/data-contracts";
import { useEffect } from "react";
import QueuePage from "./QueuePage.tsx";
import SessionChat from "@/ChatInSessions.tsx";
import { setupSession } from "@/session/session.ts";
import { useSessionStore } from "@/store/sessionStore.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import { useToastStore } from "@/store/toastStore.ts";
import { useWsStore } from "@/store/wsStore.ts";
import { useUserStore } from "@/store/userStore.ts";
import { useChatStore } from "@/store/chatStore.ts";
import { useCommentStore } from "@/store/commentStore.ts";
import { useFinalDecisionStore } from "@/store/finalDecisionStore.ts";
import { useIdeaStore } from "@/store/ideaStore.ts";

interface SessionProps {
  session: SessionResponse;
  project: ProjectDisplay;
}

const OpenSession = (props: SessionProps) => {
  const { toast } = useToast();

  const started = useSessionStore((state) => state.started);
  const loaded = useSessionStore((state) => state.loaded);
  const steps = useSessionStore((state) => state.steps);
  const currentStep = useSessionStore((state) => state.currentStep);
  const toastInfo = useToastStore((state) => state);

  useEffect(() => {
    setupSession(props.session, props.project);

    return () => {
      useWsStore.getState().ws?.disconnect();
      useWsStore.setState((state) => {
        state.ws = null;
      });
      useUserStore.setState((state) => {
        state.userList = [];
      });
      useSessionStore.setState((state) => {
        state.started = false;
        state.currentStep = 0;
        state.loaded = false;
      });
      useChatStore.setState((state) => {
        state.chatBotMessages = [];
        state.sessionMessages = [];
      });
      useCommentStore.setState((state) => {
        state.comments = new Map();
      });
      useFinalDecisionStore.setState((state) => {
        state.finalDecisions = new Map();
      });
      useIdeaStore.setState((state) => {
        state.ideaMatrix = [];
        state.combinedIdeas = new Map();
        state.expendedIdeas = [];
        state.refinedIdeas = [];
        state.roundIdeas = [];
        state.selected = [];
      });
    };
  }, []);

  useEffect(() => {
    toast({
      title: toastInfo.title,
      description: toastInfo.description,
      //@ts-ignore
      variant: toastInfo.variant,
    });
  }, [toastInfo]);

  if (!loaded) {
    return <p>loading</p>;
  }

  return (
    <>
      {started ? steps[currentStep] : <QueuePage />}
      <SessionChat />
    </>
  );
};

export default OpenSession;

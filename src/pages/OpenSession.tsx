import { ProjectDisplay, SessionResponse } from "@/apiClient/data-contracts";
import { useEffect } from "react";
import QueuePage from "./QueuePage.tsx";
import SessionChat from "@/ChatInSessions.tsx";
import { setupSession } from "@/session/session.ts";
import { useSessionStore } from "@/store/sessionStore.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import { useToastStore } from "@/store/toastStore.ts";

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

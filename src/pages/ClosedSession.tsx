import { useEffect } from "react";
import { SessionResponse, ProjectDisplay } from "@/apiClient/data-contracts";
interface ClosedSessionProps {
  session: SessionResponse;
  project: ProjectDisplay;
}

import Mindmap from "../components/mindmap/Mindmap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// TODO: fix the input & sizing
import Logo from "@/images/logo.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useClosedSessionStore } from "@/stores/closedSessionStore";
import v1Client from "@/apiClient";
import { useToast } from "@/components/ui/use-toast";
import IdeaCard from "@/components/IdeaCard";
import { useSessionStore } from "@/store/sessionStore";
import { useIdeaStore } from "@/store/ideaStore";
interface closedSessionProps {
  session_id: number;
}

function exportData(data: string, fileName: string) {
  const jsonData = JSON.stringify(data);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const ClosedSession = (props: closedSessionProps) => {
  const { toast } = useToast();
  const {
    RelatedClosedSessionsDetails,
    closedSession,
    closedSessionDetails,
    loadSession,
    successLoadSession,
    errorLoadSession,
    getSession,
    initialEdges,
    initialNodes,
    buildNodesAndEdges,
  } = useClosedSessionStore((state) => state);

  useEffect(() => {
    const fetchSession = async () => {
      await getSession(props.session_id);
      buildNodesAndEdges();
    };
    fetchSession();
  }, []);

  useEffect(() => {
    useIdeaStore.setState((state) => {
      closedSessionDetails?.ideas.map((idea) => {
        state.ideas.set(idea.idea_id, idea);
      });
    });
  }, [closedSessionDetails]);

  const handelSessoinDrive = () => {
    v1Client
      .uploadSessionToDriveV1SessionDriveSessionIdPost(
        props.session_id,
        closedSession?.title + ".json"
      )
      .then(() => {
        toast({
          title: "Session Drive",
          description: "Session uploaded successfuly",
        });
      })
      .catch((err) => {
        toast({
          title: "Session Drive",
          description: "Coudn't upload session to drive",
          variant: "destructive",
        });
        console.log(err);
      });
  };

  const handleSessionDownlaod = async () => {
    try {
      const res =
        await v1Client.downloadSessionAsJsonV1SessionDownloadSessionIdGet(
          props.session_id
        );
      exportData(res.data, ClosedSession.name + ".json");
    } catch (err) {
      toast({
        title: "Session Download",
        description: "Coudn't download session",
        variant: "destructive",
      });
      console.log(err);
    }
  };

  if (loadSession) {
    return;
    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-center p-4">
      Loading the session ...
    </h2>;
  }
  return (
    <div className="p-4 pr-16 pl-16 flex flex-col justify-around">
      <div className="flex flex-row justify-between p-0">
        <div className="flex flex-row bg-zinc-200 rounded-lg items-center p-2 h-16">
          <img src={Logo} className="h-16 p-2" />
          <p className="font-bold text-3xl justify-center items-center flex font-sans pr-2">
            Tikta
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{closedSession.title}</Button>
          </DialogTrigger>
          <DialogContent>
            <Card>
              <CardHeader>
                <CardTitle>Session details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1 space-x-4">
                  <Label htmlFor="name">Title : </Label>
                  <span
                    id="name"
                    className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100"
                  >
                    {closedSession.title}
                  </span>
                </div>
                <div className="space-y-1 space-x-4">
                  <Label htmlFor="username">Description:</Label>
                  {closedSession.description ? (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {closedSession.description}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      Not set
                    </span>
                  )}
                </div>
                <div className="space-y-1 space-x-4">
                  <Label>Ideation technique:</Label>
                  {/*@ts-ignore*/}
                  <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                    {closedSession.ideation_technique}
                  </span>
                </div>
                <div className="space-y-1 space-x-4">
                  <Label>Round time:</Label>
                  <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                    {closedSession.round_time} minutes
                  </span>
                </div>
                {closedSession.ideation_technique === "brain_writing" && (
                  <div className="space-y-1 space-x-4">
                    <Label>Number of rounds:</Label>
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {closedSession.round_time} rounds
                    </span>
                  </div>
                )}
                <div className="space-y-1 space-x-4">
                  <Label>Objective</Label>
                  {closedSession.objectives ? (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {closedSession.objectives}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      Not set
                    </span>
                  )}{" "}
                </div>
              </CardContent>
            </Card>
            <DialogFooter>
              <DialogClose>
                {/* @ts-ignore */}
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className=" space-x-2">
          <Button onClick={handelSessoinDrive}>Upload to drive</Button>
          <Button onClick={handleSessionDownlaod}>Download session</Button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Tabs defaultValue="matrix" className="w-[1400px] h-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="matrix">Ideas matrix</TabsTrigger>
            <TabsTrigger value="mindmap">Final decisions</TabsTrigger>
          </TabsList>
          <TabsContent value="mindmap">
            <div className="flex items-center justify-center">
              <Mindmap
                initialEdges={initialEdges}
                initialNodes={initialNodes}
              />
            </div>
          </TabsContent>
          <TabsContent value="matrix" className="">
            <h1>Idea Matrix:</h1>
            <div
              className={
                "w-full grid gap-8 p-8  grid-cols-" +
                Math.floor(closedSessionDetails?.ideas.length / 2)
              }
            >
              {closedSessionDetails?.ideas.map((idea) => {
                return (
                  <div className="backdrop-blur-md">
                    <IdeaCard
                      key={idea.idea_id}
                      ideaId={idea.idea_id}
                      showMod={false}
                      showVote={true}
                      showFD={false}
                    />
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClosedSession;

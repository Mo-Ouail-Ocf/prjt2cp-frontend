import React, { useEffect } from "react";
import { SessionResponse, ProjectDisplay } from "@/apiClient/data-contracts";
interface ClosedSessionProps {
  session: SessionResponse;
  project: ProjectDisplay;
}

import Mindmap from "../components/mindmap/Mindmap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// TODO: fix the input & sizing
import Logo from "@/images/logo.svg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { useClosedSessionStore } from "@/stores/closedSessionStore";
interface closedSessionProps {
  session_id: number;
}

const ClosedSession = (props: closedSessionProps) => {
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
          <Button>Import session</Button>
          <Button>Download session</Button>
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
          <TabsContent value="matrix" className="grid grid-cols-2 gap-4">
            hello world
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClosedSession;

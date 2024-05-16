import React, { useEffect } from "react";
//@ts-ignore
import Mindmap from "../components/mindmap/Mindmap";
import Logo from "@/images/logo.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

import { Label } from "@/components/ui/label";
import { useProjectSessionStore } from "@/stores/projectSessionStore";
import { useUserStore } from "@/stores/userStore";
import { useParams } from "react-router-dom";
const ProjectVisualize = () => {
  const { projectId } = useParams();
  const {
    project,
    openSessions,
    closedSessions,
    loadProject,
    successLoadProject,
    errorLoadProject,
    getProject,
    closedSessionsDetails,
    buildNodesAndEdges,
    initialEdges,
    initialNodes,
    loadNodes,
  } = useProjectSessionStore((state) => state);
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        await getProject(parseInt(projectId));
        buildNodesAndEdges();
      }
      if (user === null) {
        await getUser();
      }
    };
    fetchProject();
  }, []);
  if (loadProject) {
    return (
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-center p-4">
        Loading the project ...
      </h2>
    );
  } else {
    return (
      <div className="p-4 pr-16 pl-16 flex flex-col justify-around">
        <div className="flex flex-row justify-between p-0">
          <div className="flex flex-row bg-zinc-200 rounded-lg items-center p-2 h-16">
            <img src={Logo} className="h-16 p-2" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">{project?.title}</Button>
            </DialogTrigger>
            <DialogContent>
              <Card>
                <CardHeader>
                  <CardTitle>Project details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1 space-x-4">
                    <Label htmlFor="name">Title : </Label>
                    <span
                      id="name"
                      className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100"
                    >
                      {project?.title}
                    </span>
                  </div>
                  <div className="space-y-1 space-x-4">
                    <Label htmlFor="username">Description:</Label>
                    {project?.description ? (
                      <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                        {project?.description}
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                        Not set
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 space-x-4">
                    <Label>Creation date:</Label>
                    {/*@ts-ignore*/}
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {
                        //@ts-ignore
                        new Date(project.creation_date).toLocaleDateString()
                      }
                    </span>
                  </div>
                  <div className="space-y-1 space-x-4">
                    <Label>Ressource:</Label>
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {project?.resource?.name}
                    </span>
                  </div>
                  <div className="space-y-1 space-x-4">
                    <Label>Ressoucre description</Label>
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {project?.resource?.description}
                    </span>
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
        {!loadNodes && (
          <div className=" w-6">
            <Mindmap initialEdges={initialEdges} initialNodes={initialNodes} />
          </div>
        )}
      </div>
    );
  }
};

export default ProjectVisualize;

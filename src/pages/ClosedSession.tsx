import React from "react";
import { SessionResponse, ProjectDisplay } from "@/apiClient/data-contracts";
interface ClosedSessionProps {
  session: SessionResponse;
  project: ProjectDisplay;
}
// TODO: fix the input & sizing
import {
  UserResponse,
  CommentResponse,
  IdeaResponse,
} from "@/apiClient/data-contracts";
import IdeaCard from "@/components/IdeaCard";
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

//const [sessionDetails, setsessionDetails];
const props: ClosedSessionProps = {
  session: {
    title: "Closed Session Title",
    description: "This is a closed session description",
    ideation_technique: "brain_storming",
    objectives: "Achieve specific goals",
    round_time: 60,
    nb_rounds: 3,
    session_id: 123,
    session_status: "closed",
    start_time: "2024-05-01T10:00:00Z",
    project_id: 456,
  },
  project: {
    project_id: 456,
    title: "Sample Project",
    description: "A project for testing purposes",
    status: "active",
    creation_date: "2024-04-01T08:00:00Z",
    owner_id: 789,
    resource: {
      resource_id: 1,
      name: "Resource Name",
      type: "Type A",
      level: "Intermediate",
      description: "Resource description",
      photo: "https://example.com/resource.jpg",
    },
    participants: [
      {
        user: {
          user_id: 101,
          name: "john_doe",
          email: "john.doe@example.com",
          image: null,
        },
        role: "Participant",
        invitation_status: "accepted",
      },
      {
        user: {
          user_id: 102,
          name: "jane_doe",
          email: "jane.doe@example.com",
          image: null,
        },
        role: "Observer",
        invitation_status: "pending",
      },
    ],
  },
};

const ClosedSession = () => {
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
            <Button variant="outline">{props.session.title}</Button>
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
                    {props.session.title}
                  </span>
                </div>
                <div className="space-y-1 space-x-4">
                  <Label htmlFor="username">Description:</Label>
                  {props.session.description ? (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {props.session.description}
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
                    {props.session.ideation_technique}
                  </span>
                </div>
                <div className="space-y-1 space-x-4">
                  <Label>Round time:</Label>
                  <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                    {props.session.round_time} minutes
                  </span>
                </div>
                {props.session.ideation_technique === "brain_writing" && (
                  <div className="space-y-1 space-x-4">
                    <Label>Number of rounds:</Label>
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {props.session.round_time} rounds
                    </span>
                  </div>
                )}
                <div className="space-y-1 space-x-4">
                  <Label>Objective</Label>
                  {props.session.objectives ? (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {props.session.objectives}
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
    </div>
  );
};

export default ClosedSession;

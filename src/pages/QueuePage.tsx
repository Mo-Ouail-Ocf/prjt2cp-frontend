// TODO: fix the input & sizing
import React from "react";
import {
  SessionResponse,
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
interface QueueProps {
  isMod: boolean;
  metadata: SessionResponse;
  users: Map<number, UserResponse>;
  colors: Map<number, string>;
  handleStart: () => void;
}
const QueuePage = (props: QueueProps) => {
  return (
    <div className="h-screen w-screen p-4 pr-16 pl-16 flex flex-col justify-around">
      <div className="flex flex-row justify-between p-0">
        <div className="flex flex-row bg-zinc-200 rounded-lg items-center p-2 h-16">
          <img src={Logo} className="h-16 p-2" />
          <p className="font-bold text-3xl justify-center items-center flex font-sans pr-2">
            Tikta
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{props.metadata.title}</Button>
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
                    {props.metadata.title}
                  </span>
                </div>
                <div className="space-y-1 space-x-4">
                  <Label htmlFor="username">Description:</Label>
                  {props.metadata.description ? (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {props.metadata.description}
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
                    {props.metadata.ideation_technique}
                  </span>
                </div>
                <div className="space-y-1 space-x-4">
                  <Label>Round time:</Label>
                  <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                    {props.metadata.round_time} minutes
                  </span>
                </div>
                {props.metadata.ideation_technique === "brain_writing" && (
                  <div className="space-y-1 space-x-4">
                    <Label>Number of rounds:</Label>
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {props.metadata.round_time} rounds
                    </span>
                  </div>
                )}
                <div className="space-y-1 space-x-4">
                  <Label>Objective</Label>
                  {props.metadata.objectives ? (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {props.metadata.objectives}
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
        {props.isMod && <Button>Start the session</Button>}
      </div>
      <div className=" p-4 pr-16 pl-16 flex flex-col justify-around">
        <h1 className="text-center font-bold text-2xl">Active users</h1>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Picture</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/*@ts-ignore*/}
                {Array.from(props.users.values()).map((participant, index) => (
                  <TableRow key={index}>
                    <TableCell className="rounded-full overflow-hidden">
                      {/*@ts-ignore*/}
                      <img
                        src={participant.pfp}
                        alt=""
                        className="h-10 w-10 rounded-full border-2 border-white bg-white"
                      />
                    </TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>{participant.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QueuePage;

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { MdDeleteOutline } from "react-icons/md";

import { IoIosExpand } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { CgComment } from "react-icons/cg";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { UserResponse } from "@/apiClient/data-contracts.ts";

interface CommentInterface {
  user: UserResponse;
  comment: string;
}

interface IdeaCardProps {
  ideaId: number;
  idea: string;
  details: string | null;
  submitter: UserResponse;
  isMod: boolean;
  showVote: boolean;
  bgColor: string;

  comments: CommentInterface[];
  votes: number;
  handleComment: (comment: string, ideaId: number) => void;
  handleVote: (ideaId: number) => void;
  handleSelect: (ideaId: number, checked: boolean | "indeterminate") => void;
}

const IdeaCard = (props: IdeaCardProps) => {
  const [comment, setComment] = useState("");

  const send = (e) => {
    props.handleComment(comment, props.ideaId);
    setComment("");
    e.preventDefault();
  };
  const [bom, setBom] = useState(false);
  return (
    <Dialog>
      <Card
        style={{ backgroundColor: props.bgColor }}
        className="flex flex-col h-full w-full aspect-square rounded-md "
      >
        <CardHeader className="flex items-center justify-center">
          <Avatar>
            <AvatarImage
              src={props.submitter.pfp}
              alt={props.submitter.name}
              className=" cursor-pointer "
              onClick={() => setBom(!bom)}
            ></AvatarImage>

            <AvatarFallback
              className=" cursor-pointer "
              onClick={() => setBom(!bom)}
            >
              TK
            </AvatarFallback>
            <div
              className="text-md left-[50%] bg-white h-full w-[50%]  absolute font-medium z-0"
              style={{
                borderRadius: "0 25%  25% 0",
                width: bom ? "50%" : "0",
                transition: " ease-in-out 0.6s",
              }}
            >
              <div className="absolute h-full w-full grid box-border pr-2  place-items-center grid-cols-3 grid-flow-col ">
                <DialogTrigger asChild>
                  <CgComment className="   cursor-zoom-in h-full w-full  box-border p-1  col-start-3" style={{ color:props.bgColor}}  onClick={() => setBom(!bom)}/>
                </DialogTrigger>
                <CiEdit
                  className="  c h-full w-full   p-1 col-start-2 "
                  style={{ cursor: props.isMod ? "pointer" : "not-allowed", color:props.bgColor } }
                  onClick={() => setBom(!bom)}
                />
              </div>
            </div>
            <div
              className="text-md right-[50%] bg-white h-full   absolute  font-medium z-0"
              style={{
                borderRadius: "25% 0 0 25% ",
                width: bom ? "50%" : "0",
                transition: " ease-in-out 0.6s",
              }}
            >
              <div className="absolute h-full w-full grid box-border pl-2  place-items-center grid-cols-3 grid-flow-col ">
                <IoIosExpand
                  className="  c h-full w-full   p-1 col-start-2 "
                  style={{ cursor: props.isMod ? "pointer" : "not-allowed" , color:props.bgColor}}
                  onClick={() => setBom(!bom)}
                />
                <MdDeleteOutline
                  className=" text-red-900 h-full w-full   p-1 col-start-1"
                  style={{ cursor: props.isMod ? "pointer" : "not-allowed" }}
                  onClick={() => setBom(!bom)}
                />
              </div>
            </div>
          </Avatar>
        </CardHeader>
        <CardContent className="p-0 box-border m-1 flex-col flex flex-grow ">
          {
            <>
              <div className="rounded-md pt-0 border p-2 overflow-hidden hover:overflow-y-auto h-full flex-grow relative">
                <p className="absolute">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus, officia ipsa. A neque, commodi delectus nisi
                  omnis, velit nam voluptatum atque blanditiis dolor corporis
                  asperiores aut laborum iusto mollitia non! ,lsnns Lorem ipsum
                  dolor sit amet consectetur, adipisicing elit. Tenetur quae
                  laudantium doloremque porro dolore modi nam obcaecati
                  praesentium inventore maiores vel ratione suscipit, saepe
                  libero esse voluptates non consequuntur delectus!
                </p>
              </div>
            </>
          }
        </CardContent>
        <CardFooter className="flex flex-row-reverse items-center p-0 justify-between">
          {props.isMod ? (
            <Checkbox
              className="m-1"
              onCheckedChange={(checked) => {
                props.handleSelect(props.ideaId, checked);
              }}
            />
          ) : null}

          {props.isMod && (
            <Button
              className="fixed bottom-2 z-10 right-4 w-44 h-12 "
              style={{ fontSize: "1.5rem" }}
            >
              Combine
            </Button>
          )}

          {props.showVote ? (
            <Button
              variant="outline"
              className="text-base m-1 h-6 w-8"
              onClick={() => props.handleVote(props.ideaId)}
            >
              {props.votes}
            </Button>
          ) : null}
        </CardFooter>

        {/* 
        
         
          
            <Button variant="outline" className="text-lg m-1 h-6 w-8">
              ...
            </Button>
          </DialogTrigger>
        </CardFooter> */}
      </Card>

      <DialogContent>
        {/* <ScrollArea className="rounded-md p-2"> */}
        <DialogHeader>
          <DialogTitle>{props.submitter.name}'s Idea</DialogTitle>
          <p className="hyphens-auto">{props.idea}</p>
          <DialogDescription className="hyphens-auto">
            {props.details}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div>
          <p className="text-lg font-medium bold mb-2">Comments : </p>
          <ScrollArea className="rounded-md border p-2 h-48">
            {props.comments.map((comment) => {
              return (
                <div className="flex items-center mb-2">
                  <Avatar className="max-h-8 max-w-8 mr-2">
                    <AvatarImage
                      src={comment.user.pfp}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>TK</AvatarFallback>
                  </Avatar>
                  <p className="text-lg bg-red-50 max-h-8 hyphens-auto rounded-lg p-1">
                    {comment.comment}
                  </p>
                </div>
              );
            })}
          </ScrollArea>
        </div>
        <DialogFooter>
          <form
            onSubmit={send}
            className="flex justify-between w-full space-x-2"
          >
            <Input
              placeholder="Enter a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit">Comment</Button>
          </form>
        </DialogFooter>
        {/* </ScrollArea> */}
      </DialogContent>
    </Dialog>
  );
};

export default IdeaCard;

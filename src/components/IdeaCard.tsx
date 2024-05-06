import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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

  return (
    <Dialog className="w-full h-full">
      <Card
        style={{ backgroundColor: props.bgColor }}
        className="flex flex-col h-full w-full"
      >
        <CardContent className="p-4 min-h-36 min-w-64 h-full">
          <p className="text-lg">{props.idea}</p>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-row justify-end items-center h-8 p-0">
          {props.isMod ? (
            <Checkbox
              className="m-1"
              onCheckedChange={(checked) =>
                props.handleSelect(props.ideaId, checked)
              }
            />
          ) : null}
          {props.showVote ? (
            <Button
              variant="outline"
              className="text-base m-1 h-6 w-8"
              onClick={() => props.handleVote(props.ideaId)}
            >
              {props.votes}
            </Button>
          ) : null}
          <DialogTrigger asChild>
            <Button variant="outline" className="text-lg m-1 h-6 w-8">
              ...
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.submitter.name}'s Idea</DialogTitle>
          <p>{props.idea}</p>
          <DialogDescription>{props.details}</DialogDescription>
        </DialogHeader>
        <Separator />
        <div>
          <p className="text-lg font-medium bold mb-2">Comments : </p>
          <ScrollArea className="rounded-md border p-2 h-48">
            {/*@ts-ignore*/}
            {props.comments.map((comment) => {
              <div className="flex items-center mb-2">
                <Avatar className="max-h-8 max-w-8 mr-2">
                  <AvatarImage src={comment.user.pfp} alt={comment.user.name} />
                  <AvatarFallback>TK</AvatarFallback>
                </Avatar>
                <p className="text-lg bg-red-50 max-h-8 hyphens-auto rounded-lg p-1">
                  {comment.comment}
                </p>
              </div>;
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
      </DialogContent>
    </Dialog>
  );
};

export default IdeaCard;

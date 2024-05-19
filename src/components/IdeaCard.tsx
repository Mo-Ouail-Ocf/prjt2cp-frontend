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
import { GiVote } from "react-icons/gi";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosExpand } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { CgComment } from "react-icons/cg";
import SingleActionMenu from "./SingleActionMenu";
import { useEffect, useState } from "react";
import { useWsStore } from "@/store/wsStore";
import { useUserStore } from "@/store/userStore";
import { useIdeaStore } from "@/store/ideaStore";
import { useCommentStore } from "@/store/commentStore";
import { useFinalDecisionStore } from "@/store/finalDecisionStore";

interface IdeaCardProps {
  ideaId: number;
  showMod: boolean;
  showVote: boolean;
  showFD: boolean;
}

const IdeaCard = (props: IdeaCardProps) => {
  const ws = useWsStore((state) => state.ws);
  const idea = useIdeaStore((state) => state.ideas).get(props.ideaId);
  const [bgColor, setBgColor] = useState(
    useUserStore((state) => state.colors).get(idea?.submitter_id as number)
  );
  const users = useUserStore((state) => state.users);
  const comments = useCommentStore((state) => state.comments).get(props.ideaId);
  const finalDecisions = useFinalDecisionStore((state) => state.finalDecisions);

  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [rationale, setRationale] = useState("");
  const [checked, setChecked] = useState(false);
  const [bom, setBom] = useState(false);
  const [canMod, setCanMod] = useState(
    // props.ideaId != 0 &&
    !idea?.deleted &&
      (idea?.idea_type == "" || idea?.idea_type == "refined") &&
      props.showMod
  );

  const handleComment = (e: any) => {
    if (comment != "") {
      ws?.sendComment(props.ideaId, comment);
      setComment("");
    }
    e.preventDefault();
  };

  const handleExpend = (ideaContent: string, ideaDetails: string) => {
    if (ideaContent != "") {
      ws?.sendIdea(ideaContent, ideaDetails, props.ideaId, "expended");
    }
  };

  const handleDelete = () => {
    if (canMod) {
      ws?.sendIdeaUpdate(props.ideaId, null, null, true);
    }
  };

  const handleRefine = (ideaContent: string, ideaDetails: string) => {
    const content = ideaContent != "" ? ideaContent : null;
    const details = ideaDetails != "" ? ideaDetails : null;

    ws?.sendIdeaUpdate(props.ideaId, content, details);
  };

  const handleFD = (e: any) => {
    ws?.sendFinalDecision(props.ideaId, rationale);
    e.preventDefault();
  };

  useEffect(() => {
    useIdeaStore.setState((state) => {
      const index = state.selected.indexOf(props.ideaId);

      if (checked && index < 0) {
        state.selected.push(props.ideaId);
        return;
      }

      if (!checked && index >= 0) {
        state.selected.splice(index, 1);
      }
    });
  }, [checked]);

  useEffect(() => {
    if (idea?.deleted) {
      setBgColor("gray");
    }
    setCanMod(
      props.ideaId != 0 &&
        !idea?.deleted &&
        (idea?.idea_type == "" || idea?.idea_type == "refined") &&
        props.showMod
    );
  }, [idea]);

  return (
    <Dialog>
      <Card
        style={{ backgroundColor: bgColor }}
        className="flex flex-col h-full w-full aspect-square rounded-md "
      >
        {props.ideaId != 0 && (
          <CardHeader className="flex items-center justify-center">
            <Avatar>
              {idea?.idea_type == "" || idea?.idea_type == "refined" ? (
                <AvatarImage
                  src={users.get(idea?.submitter_id)?.pfp}
                  alt={users.get(idea?.submitter_id)?.name}
                  className=" cursor-pointer "
                  onClick={() => setBom(!bom)}
                ></AvatarImage>
              ) : (
                <AvatarImage
                  src=""
                  alt=""
                  className=" cursor-pointer "
                  onClick={() => setBom(!bom)}
                ></AvatarImage>
              )}

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
                    <CgComment className="text-blue-500 cursor-zoom-in h-full w-full  box-border p-1  col-start-3" />
                  </DialogTrigger>
                  <SingleActionMenu
                    action="Refine"
                    ideaId={props.ideaId}
                    handleAction={handleRefine}
                    disabled={!canMod}
                  >
                    <CiEdit
                      className=" text-blue-500 c h-full w-full p-1 col-start-2 "
                      style={{
                        cursor: canMod ? "pointer" : "not-allowed",
                      }}
                    />
                  </SingleActionMenu>
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
                  <SingleActionMenu
                    action="Expend"
                    ideaId={props.ideaId}
                    handleAction={handleExpend}
                    disabled={!canMod}
                  >
                    <IoIosExpand
                      className=" text-blue-500 c h-full w-full   p-1 col-start-2 "
                      style={{
                        cursor: canMod ? "pointer" : "not-allowed",
                      }}
                    />
                  </SingleActionMenu>
                  <MdDeleteOutline
                    className=" text-red-900 h-full w-full   p-1 col-start-1"
                    style={{
                      cursor: canMod ? "pointer" : "not-allowed",
                    }}
                    onClick={handleDelete}
                  />
                </div>
              </div>
            </Avatar>
          </CardHeader>
        )}
        <CardContent className="p-0 box-border m-1 flex-col flex flex-grow ">
          {
            <>
              <div className="rounded-md pt-0 border p-2 overflow-hidden hover:overflow-y-auto h-full flex-grow relative">
                <p className="absolute">{idea?.content}</p>
              </div>
            </>
          }
        </CardContent>
        <CardFooter className="flex flex-row-reverse items-center p-0 justify-between">
          {canMod ? (
            <Checkbox
              className="m-1"
              checked={checked}
              onCheckedChange={(s) => {
                setChecked(s == true);
              }}
            />
          ) : null}
          {props.showVote && props.ideaId != 0 && !idea?.deleted ? (
            <Button
              variant="outline"
              className="text-base m-1 h-6 w-8"
              onClick={() => {
                ws?.sendVote(props.ideaId);
              }}
            >
              {idea?.votes}
            </Button>
          ) : null}

          {props.ideaId != 0 && finalDecisions.has(props.ideaId) && (
            // <CiStar className="m-2 text-yellow-50" />
            <GiVote className="m-2"/>
          )}

          {props.showFD &&
          props.ideaId != 0 &&
          !idea?.deleted &&
          !finalDecisions.has(props.ideaId) ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-base m-1 h-6 w-8">
                  FD
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{idea?.content}</DialogTitle>
                  <DialogDescription>{idea?.details}</DialogDescription>
                </DialogHeader>
                <div className="">
                  <Label htmlFor="rationale">Rationale: </Label>
                  <Input
                    id="idea"
                    placeholder="Enter finale decision rationale"
                    value={rationale}
                    onChange={(e) => setRationale(e.target.value)}
                  />
                </div>
                <form onSubmit={handleFD}>
                  <DialogFooter>
                    <Button type="submit">Make final decision</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          ) : null}
        </CardFooter>
      </Card>

      <DialogContent>
        {/* <ScrollArea className="rounded-md p-2"> */}
        <DialogHeader>
          <DialogTitle>
            {users.get(idea?.submitter_id as number)?.name}'s Idea
          </DialogTitle>
          <p className="hyphens-auto">{idea?.content}</p>
          <DialogDescription className="hyphens-auto">
            {idea?.details}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="max-w-full">
          <p className="text-lg font-medium bold mb-2">Comments : </p>
          <ScrollArea className="rounded-md border p-2 h-48 max-w-full">
            {comments?.map((comment) => {
              return (
                <div className="flex items-center mb-2">
                  <Avatar className="max-h-8 max-w-8 mr-2">
                    <AvatarImage
                      src={users.get(comment.author_id)?.pfp}
                      alt={users.get(comment.author_id)?.name}
                    />
                    <AvatarFallback>TK</AvatarFallback>
                  </Avatar>
                  <p className="text-lg bg-red-50 hyphens-auto rounded-lg p-1">
                    {comment.content}
                  </p>
                </div>
              );
            })}
          </ScrollArea>
        </div>
        <DialogFooter>
          <form
            onSubmit={handleComment}
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

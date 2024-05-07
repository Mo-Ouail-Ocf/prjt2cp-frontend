// TODO: fix the input & sizing
import React, { useEffect } from "react";
import Logo from "@/images/logo.svg";
import { useState } from "react";
import Countdown from "react-countdown";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import IdeaCard from "@/components/IdeaCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  SessionResponse,
  UserResponse,
  IdeaResponse,
  CommentResponse,
} from "@/apiClient/data-contracts";

interface BSProps {
  metadata: SessionResponse; //no
  users: Map<number, UserResponse>; //no
  ideas: Map<number, IdeaResponse>; //yes
  colors: Map<number, string>; //no
  comments: CommentResponse[]; //yes
  handleComment: (comment: string, ideaId: number) => void;
  handleIdea: (idea: string, details: string) => void;
  handlePhaseEnd: () => void;
}

const Brainstorming = (props: BSProps) => {
  const [ideaContent, setIdeaContent] = useState("");
  const [details, setDetails] = useState("");
  const endTime = Date.now() + props.metadata.round_time * 60 * 1000;

  const submitIdea = (e) => {
    props.handleIdea(ideaContent, details);
    setIdeaContent("");
    setDetails("");
    e.preventDefault();
  };

  const handleTimerComplete = () => {
    // this function is wrapped here in case we need to do some defensive stuff
    props.handlePhaseEnd();
  };

  let gridLayout;
  switch (props.users.size) {
    case 6:
    case 5:
      gridLayout = " grid-cols-3 p-16 gap-16";
      break;
    case 4:
    case 3:
      gridLayout = " grid-cols-2 p-24 gap-16";
      break;
    default:
      gridLayout = " grid-cols-1 p-48 gap-16";
      break;
  }
  useEffect(() => {
    // This effect will trigger whenever props.ideas changes
    console.log("Props.ideas changed:", props.ideas);
  }, [props.ideas]);

  return (
    <div className="h-screen w-screen p-4 pr-16 pl-16 flex flex-col justify-around">
      <div className="flex flex-row justify-between p-0">
        <div className="flex flex-row bg-zinc-200 rounded-lg items-center p-2 h-16">
          <img src={Logo} className="h-16 p-2" />
          <p className="font-bold text-3xl justify-center items-center flex font-sans pr-2">
            Tikta
          </p>
        </div>
        <p className="bg-zinc-200 p-4 rounded-lg font-semibold text-xl content-center">
          Idaeation session title
        </p>
        <p className="bg-zinc-200 p-4 rounded-lg text-xl font-semibold content-center">
          <Countdown
            date={endTime}
            daysInHours={true}
            onComplete={handleTimerComplete}
          />
        </p>
      </div>

      <div className={"h-full w-full mt-4 grid grid-cols-2" + gridLayout}>
        {Array.from(props.users.values()).map((user) => {
          return (
            <div className="flex flex-col">
              <Avatar className="h-14 w-14 ml-auto mr-auto border">
                <AvatarImage src={user.pfp} alt={user.name} />
                <AvatarFallback>TK</AvatarFallback>
              </Avatar>
              <Carousel key={user.id} className="p-5 h-full">
                <CarouselPrevious className="-left-4 z-10" />
                <CarouselContent className="h-full ">
                  {Array.from(props.ideas.values()).map((idea) => {
                    if (idea.submitter_id == user.id) {
                      const ideaProps = {
                        ideaId: idea.idea_id,
                        idea: idea.content,
                        details: idea.details,
                        submitter: user,
                        isMod: false,
                        showVote: false,
                        bgColor: props.colors.get(user.id),
                        comments: props.comments.filter((comment) => {
                          comment.idea_id == idea.idea_id;
                        }),
                        votes: 0,
                        handleComment: props.handleComment,
                        handleVote: (ideaId: number) => {},
                        handleSelect: (
                          ideaId: number,
                          checked: boolean | "indeterminate"
                        ) => {},
                      };
                      return (
                        <CarouselItem className="h-full">
                          <IdeaCard {...ideaProps} />
                        </CarouselItem>
                      );
                    }
                  })}
                </CarouselContent>
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
          );
        })}
      </div>
      <div className="mt-4 max-h-26">
        <ScrollArea className="rounded-md border max-h-26">
          <form
            onSubmit={submitIdea}
            className="p-4 flex justify-between flex-col space-y-4"
          >
            <Input
              placeholder="Enter an idea"
              value={ideaContent}
              onChange={(e) => setIdeaContent(e.target.value)}
              className=""
            />
            <Input
              placeholder="Enter details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Brainstorming;

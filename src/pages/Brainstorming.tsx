// TODO: fix the input & sizing
import React from "react";
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
  metadata: SessionResponse;
  users: Map<number, UserResponse>;
  ideas: Map<number, IdeaResponse>;
  colors: Map<number, string>;
  comments: CommentResponse[];
  handleComment: (comment: string, ideaId: number) => void;
  handleIdea: (idea: string, details: string) => void;
  handlePhaseEnd: () => void;
}

// test data
// const metadata = {
//   title: "session title",
//   ideation_technique: "brain_storming",
//   round_time: 5,
//   session_id: 1,
//   session_status: "started",
//   start_time: "",
//   project_id: 1,
// }
//
// const user1 = {
//   email: "user1_name@esi.dz",
//   id: 1,
//   name: "name1",
//   pfp: "https://www.esi.dz/wp-content/uploads/2023/05/logo_esi.png "
// }
// const user2 = {
//   email: "user2_name@esi.dz",
//   id: 2,
//   name: "name2",
//   pfp: "https://www.esi.dz/wp-content/uploads/2023/05/logo_esi.png "
// }
// const user3 = {
//   email: "user3_name@esi.dz",
//   id: 3,
//   name: "name3",
//   pfp: "https://www.esi.dz/wp-content/uploads/2023/05/logo_esi.png "
// }
//
// const users = new Map();
// users.set(1, user1)
// users.set(2, user2)
// users.set(3, user3)
//
// const idea1 = {
//   content: "idea1",
//   details: null,
//   parent_idea_id: null,
//   submitter_id: 1,
//   session_id: 1,
//   idea_id: 1,
//   creation_date: "",
//   votes: null,
//   deleted: false,
// }
// const idea2 = {
//   content: "idea2",
//   details: null,
//   parent_idea_id: null,
//   submitter_id: 2,
//   session_id: 1,
//   idea_id: 2,
//   creation_date: "",
//   votes: null,
//   deleted: false,
// }
//
// const ideas = new Map();
// ideas.set(1, idea1)
// ideas.set(2, idea2)
// // ideas.set(3, idea3)
//
//
// const colors = new Map();
// colors.set(1, "red")
// colors.set(2, "green")
// colors.set(3, "blue")
//
// const comments = []
//
// const props = {
//   metadata: metadata,
//   users: users,
//   ideas: ideas,
//   colors: colors,
//   comments: comments,
//   handleComment: (comment: string, ideaId: number) => {},
//   handleIdea: (idea: string, details: string) => {},
//   handlePhaseEnd: () => {},
// }

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

  let displays = [];

  props.users.forEach((user, user_id) => {
    let ideas = [];

    props.ideas.forEach((idea, idea_id) => {
      if (idea.submitter_id == user_id) {
        const ideaProps = {
          ideaId: idea_id,
          idea: idea.content,
          details: idea.details,
          submitter: user,
          isMod: false,
          showVote: false,
          bgColor: props.colors.get(user_id),
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
        ideas.push(
          <CarouselItem className="h-full">
            <IdeaCard {...ideaProps} className="h-full" />
          </CarouselItem>
        );
      }
    });

    if (ideas.length == 0) {
      const ideaProps = {
        ideaId: 0,
        idea: "[thinking.....]",
        details: "",
        submitter: user,
        isMod: false,
        showVote: false,
        bgColor: props.colors.get(user_id),
        comments: [],
        votes: 0,
        handleComment: (ideaId, comment) => {},
        handleVote: (ideaId: number) => {},
        handleSelect: (
          ideaId: number,
          checked: boolean | "indeterminate"
        ) => {},
      };
      ideas.push(
        <CarouselItem className="h-full">
          <IdeaCard {...ideaProps} />
        </CarouselItem>
      );
    }

    displays.push(
      <div className="flex flex-col">
        <Avatar className="h-14 w-14 ml-auto mr-auto border">
          <AvatarImage src={user.pfp} alt={user.name} />
          <AvatarFallback>TK</AvatarFallback>
        </Avatar>
        <Carousel key={user.id} className="p-5 h-full">
          <CarouselPrevious className="-left-4 z-10" />
          <CarouselContent className="h-full ">{ideas}</CarouselContent>
          <CarouselNext className="-right-4" />
        </Carousel>
      </div>
    );
  });

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
            daysInHours={true} onComplete={handleTimerComplete}/>
        </p>
      </div>

      <div className={"h-full w-full mt-4 grid grid-cols-2" + gridLayout}>
        {displays}
      </div>
      <div className="mt-4 max-h-26">
        {/*
        <ScrollArea className="rounded-md border max-h-26">
          <form onSubmit={submitIdea} className="p-4 flex justify-between flex-col space-y-4">
              <Input placeholder="Enter an idea" value={ideaContent} onChange={e => setIdeaContent(e.target.value)} className=""/>
              <Input placeholder="Enter details" value={details} onChange={e => setDetails(e.target.value)}/>
              <Button type="submit">Submit</Button>
          </form>
        </ScrollArea>
        */}
      </div>
    </div>
  )
}

export default Brainstorming

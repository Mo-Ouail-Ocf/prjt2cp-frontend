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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserResponse } from "@/apiClient/data-contracts";
import { useWsStore } from "@/store/wsStore";
import { useSessionStore } from "@/store/sessionStore";
import { useUserStore } from "@/store/userStore";
import { useIdeaStore } from "@/store/ideaStore";

const Brainstorming: React.FC = () => {
  const ws = useWsStore((state) => state.ws);
  const session = useSessionStore((state) => state.session);
  const userList = useUserStore((state) => state.userList);
  const users = useUserStore((state) => state.users);
  const ideas = useIdeaStore((state) => state.ideas);

  const [ideaContent, setIdeaContent] = useState("");
  const [details, setDetails] = useState("");
  const [endTime, _useEndTime] = useState(
    //@ts-ignore
    Date.now() + session?.round_time * 60 * 1000
  );

  const submitIdea = (e: any) => {
    if (ideaContent != "") {
      ws?.sendIdea(ideaContent, details, null);
      setIdeaContent("");
      setDetails("");
    }
    e.preventDefault();
  };

  const handleTimerComplete = () => {
    useIdeaStore.setState((state) => {
      const ideaList = Array.from(ideas.keys()).filter((ideaId) => ideaId != 0);

      let rows = Math.sqrt(ideaList.length);
      if (!Number.isInteger(rows)) {
        rows = Math.trunc(rows) + 1;
      }

      for (let i = 0; i < ideaList.length; i += rows) {
        const row = ideaList.slice(i, i + rows);
        console.log(row);

        state.ideaMatrix.push(row);
      }
    });
    useSessionStore.setState((state) => {
      state.currentStep++;
    });
  };

  let gridLayout;
  switch (userList.length) {
    case 6:
    case 5:
      gridLayout = " grid-cols-3 gap-16";
      break;
    default:
      gridLayout = " grid-cols-2 gap-16";
      break;
  }

  return (
    <div className="h-screen w-screen p-4 pr-16 pl-16 flex flex-col justify-between">
      <div className="flex flex-row justify-between p-0">
        <div className="flex flex-row bg-zinc-200 rounded-lg items-center p-2 h-16">
          <img src={Logo} className="h-16 p-2" />
        </div>
        <p className="bg-zinc-200 p-4 rounded-lg font-semibold text-xl content-center">
          {session?.title}
        </p>
        <p className="bg-zinc-200 p-4 rounded-lg text-xl font-semibold content-center">
          <Countdown
            date={endTime}
            daysInHours={true}
            onComplete={handleTimerComplete}
          />
        </p>
      </div>

      <div className={"w-full h-full p-8 grid " + gridLayout}>
        {userList.map((userId) => {
          const user = users.get(userId) as UserResponse;
          const userIdeas = Array.from(ideas.values()).filter(
            (idea) => idea.submitter_id == user.id
          );

          return (
              <Carousel className="w-full h-full">
                <CarouselPrevious className="-left-4" />
                <CarouselContent className="w-full h-full">
                  {userIdeas.length > 0 ? (
                    userIdeas.map((idea) => (
                      <CarouselItem
                        className="h-full w-full"
                        key={idea.idea_id}
                      >
                        <IdeaCard
                          ideaId={idea.idea_id}
                          showMod={false}
                          showVote={false}
                          showFD={false}
                        />
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem className="h-full w-full">
                      <IdeaCard
                        ideaId={0}
                        showMod={false}
                        showVote={false}
                        showFD={false}
                      />
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselNext className="-right-4" />
              </Carousel>
          );
        })}
      </div>
      <div className="">
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
      </div>
    </div>
  );
};

export default Brainstorming;

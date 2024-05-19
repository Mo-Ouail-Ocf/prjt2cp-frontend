import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Logo from "@/images/logo.svg";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWsStore } from "@/store/wsStore";
import { useSessionStore } from "@/store/sessionStore";
import { useUserStore } from "@/store/userStore";
import { useIdeaStore } from "@/store/ideaStore";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import IdeaCard from "@/components/IdeaCard";

type State = {
  canSubmit: boolean;
  endTime: number;
  parentIdeaId: number | null;
  round: number;
};

const useBWStore = create<State>()(
  immer((_set) => ({
    canSubmit: true,
    endTime: Infinity,
    parentIdeaId: null,
    round: 0,
  }))
);

const Brainwriting = () => {
  const ws = useWsStore((state) => state.ws);
  const session = useSessionStore((state) => state.session);
  const userList = useUserStore((state) => state.userList);
  const userId = useSessionStore((state) => state.userId);
  const ideas = useIdeaStore((state) => state.ideas);
  const ideaMatrix = useIdeaStore((state) => state.ideaMatrix);

  const [ideaContent, setIdeaContent] = useState("");
  const [details, setDetails] = useState("");

  const ref = useRef<Countdown | null>(null);

  const canSubmit = useBWStore((state) => state.canSubmit);
  const endTime = useBWStore((state) => state.endTime);
  const parentIdeaId = useBWStore((state) => state.parentIdeaId);
  const round = useBWStore((state) => state.round);

  useEffect(() => {
    useBWStore.setState((state) => {
      state.endTime = (Date.now() +
        (session?.round_time as number) * 60 * 1000) as number;
    });
  }, []);

  const handleTimerComplete = (_: CountdownTimeDelta, started: boolean) => {
    if (started) {
      // @ts-ignore
      ref.current?.start();
      return;
    }

    useBWStore.setState((bwState) => {
      const nbRounds = session?.nb_rounds as number;
      bwState.round++;
      bwState.canSubmit = false;

      if (bwState.round >= nbRounds) {
        useSessionStore.setState((state) => {
          state.currentStep++;
        });
      }

      useIdeaStore.setState((state) => {
        const rotations = (bwState.round - 1) % state.roundIdeas.length;
        const spliced = state.roundIdeas.splice(
          state.roundIdeas.length - rotations
        );
        state.roundIdeas.unshift(...spliced);
        state.ideaMatrix.push([...state.roundIdeas]);

        const newParentId = state.roundIdeas[userList.indexOf(userId)];
        if (newParentId != 0) {
          bwState.parentIdeaId = newParentId;
        }
        state.roundIdeas = state.roundIdeas.fill(0);
      });

      bwState.endTime = (Date.now() +
        (session?.round_time as number) * 60 * 1000) as number;
      bwState.canSubmit = true;
      // @ts-ignore
      ref.current?.start();
    });
  };

  const handleIdeaSubmit = (e: any) => {
    if (ideaContent != "" && canSubmit) {
      useBWStore.setState((state) => {
        state.canSubmit = false;
      });

      ws?.sendIdea(ideaContent, details, parentIdeaId);

      setIdeaContent("");
      setDetails("");
    }

    e.preventDefault();
  };

  return (
    <div className="h-screen w-screen p-4 pr-16 pl-16 flex flex-col justify-around">
      <div className="flex flex-row justify-between p-0">
        <img src={Logo} className="h-16 p-2" />
        <p className="bg-zinc-200 p-4 rounded-lg font-semibold text-xl content-center">
          {session?.title}
        </p>
        <p className="bg-zinc-200 p-4 rounded-lg text-xl font-semibold content-center">
          <Countdown
            ref={ref}
            date={endTime}
            daysInHours={true}
            onComplete={handleTimerComplete}
          />
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Tabs defaultValue="Idea Submission" className="w-[1400px] h-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Idea Submission">Idea Submission</TabsTrigger>
            <TabsTrigger value="Previous ideas">Previous ideas</TabsTrigger>
          </TabsList>
          <TabsContent value="Idea Submission">
            {canSubmit ? (
              <div className="flex items-center justify-center">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className=" text-center">
                      Express you thoughts
                    </CardTitle>
                    <br />
                    <CardDescription className=" text-center">
                      Make others discover your ideas & mentality
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleIdeaSubmit}>
                    <CardContent>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="idea">Your idea</Label>
                          <Input
                            id="idea"
                            placeholder="Enter an idea"
                            value={ideaContent}
                            onChange={(e) => setIdeaContent(e.target.value)}
                            className=""
                          />
                        </div>
                        <br />
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="details">Idea details</Label>
                          <Input
                            id="details"
                            placeholder="Enter details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button type="submit">Submit</Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>
            ) : (
              <p>Idea submitted</p>
            )}
          </TabsContent>
          <TabsContent
            value="Previous ideas"
            className="grid grid-cols-2 gap-4"
          >
            {round >= 1 ? (
              <Carousel className="p-5 h-full">
                <CarouselPrevious className="-left-4 z-10" />
                <CarouselContent className="h-full ">
                  {Array.from({ length: round }, (_, index) => index).map(
                    (i) => {
                      const idea = ideas.get(
                        ideaMatrix[i][
                          (userList.indexOf(userId) + round) % userList.length
                        ]
                      );
                      return (
                        <CarouselItem className="h-full" key={idea?.idea_id}>
                          <IdeaCard
                            ideaId={idea == undefined ? 0 : idea.idea_id}
                            showMod={false}
                            showVote={false}
                            showFD={false}
                          />
                        </CarouselItem>
                      );
                    }
                  )}
                </CarouselContent>
                <CarouselNext className="-right-4" />
              </Carousel>
            ) : (
              <p>no previous ideas</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Brainwriting;

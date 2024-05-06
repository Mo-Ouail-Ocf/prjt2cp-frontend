import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/images/logo.svg";
import IdeaCard from "@/components/IdeaCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bold, Italic, Underline } from "lucide-react";
import Countdown from "react-countdown";
import {
  CommentResponse,
  IdeaResponse,
  SessionResponse,
  UserResponse,
} from "@/apiClient/data-contracts";

interface BWProps {
  metadata: SessionResponse;
  users: Map<number, UserResponse>;
  usersList: number[]; // ordred list, doesn't change after session start
  ideas: Map<number, IdeaResponse>;
  colors: Map<number, string>;
  comments: CommentResponse[];
  handleComment: (comment: string, ideaId: number) => void;
  handleIdea: (
    idea: string,
    details: string,
    parent_idea_id: number | null
  ) => void;
  handleRoundEnd: () => void;
  handlePhaseEnd: () => void;
}
const idea1 = {
  idea: "idea1",
  details: null,
  submitter: {
    name: "ouail",
    userId: 1,
  },
  isMod: false,
  ideaId: 1,
  votes: 0,
  bgColor: "red",
  comments: [],
  handleComment: (comment: string, ideaId: number) => {},
  handleVote: (ideaId: number) => {},
  handleSelect: (ideaId: number, checked: boolean | "indeterminate") => {},
};

export function TabsDemo() {
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
          cc
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Tabs defaultValue="Idea Submission" className="w-[1400px] h-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Idea Submission">Idea Submission</TabsTrigger>
            <TabsTrigger value="Previous ideas">Previous ideas</TabsTrigger>
          </TabsList>
          <TabsContent value="Idea Submission">
            <div className="flex items-center justify-center">
              <Card className="w-[1400px]">
                <CardHeader>
                  <CardTitle className=" text-center">Create project</CardTitle>
                  <br />
                  <CardDescription className=" text-center">
                    Deploy your new project in one-click.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="idea">Your idea</Label>
                        <Input id="idea" placeholder="Idea content" />
                      </div>
                      <br />
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="details">Idea details</Label>
                        <Input id="details" placeholder="Your idea's details" />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Submit</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent
            value="Previous ideas"
            className="grid grid-cols-2 gap-4"
          >
            <IdeaCard {...idea1} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

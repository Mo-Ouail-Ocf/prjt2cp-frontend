import { useEffect, useState } from "react";
import ChatArea, { SentMessage, ReceivedMessage } from "./components/Chat";
import Chatbot from "./assets/chatbot.png";
import Queue from "./assets/queue.png";
import Chat from "./assets/chat.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import brainstorming from "./assets/brainstrom.png";
import brainwriting from "./assets/brainwrite.png";
import {
  Dialog,
  DialogContent, DialogHeader, DialogTrigger
} from "@/components/ui/dialog";
import {
  Card,
  CardContent, CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserResponse } from "./apiClient/data-contracts";
import { useUserStore } from "./store/userStore";
import { useChatStore } from "./store/chatStore";
import { useWsStore } from "./store/wsStore";
import v1Client from "./apiClient";
import TeamWork from "./assets/teamwork.png";
/* this the well positioned 2 chats and buttons to use within our ideation sessions*/
import { useSessionStore } from "./store/sessionStore";
const handleBotMessage = async (msg: string) => {
  const userId = useSessionStore.getState().userId;
  useChatStore.setState((state) => {
    state.chatBotMessages.push({ user_id: userId, msg: msg });
  });

  const res = await v1Client.generateIdeasV1BotGenerateIdeasPost({
    topic: msg,
  });
  res.data.map((idea: string) => {
    if (idea != "") {
      useChatStore.setState((state) => {
        state.chatBotMessages.push({ user_id: 0, msg: idea });
      });
    }
  });
};

const SessionChat = () => {
  const session = useSessionStore((state) => state.session);
  const currStep = useSessionStore((state) => state.currentStep);
  const started = useSessionStore((state) => state.started);
  const [showChat1, setShowChat1] = useState(false);
  const [showChat2, setShowChat2] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const users = useUserStore((state) => state.users);
  const userId = useSessionStore((state) => state.userId);
  const sessionMessages = useChatStore((state) => state.sessionMessages);
  const chatBotMessages = useChatStore((state) => state.chatBotMessages);
  const ws = useWsStore((state) => state.ws);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);
  const handleButtonClick = (buttonNum: number) => {
    if (buttonNum === 1) {
      setShowChat1(true);
      setShowChat2(false); // Close Button 2
    } else if (buttonNum === 2) {
      setShowChat1(false); // Close Button 1
      setShowChat2(true);
    }
  };

  return (
    <div className="">
      <div className="fixed bottom-4 right-4">
        <Dialog>
          <DialogTrigger>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Help
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <p></p>
            </DialogHeader>
            <ScrollArea className="h-[400px] w-[450px] rounded-md border">
              <Card>
                {/*  */}
                {!started ? (
                  <>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center">
                        <span>Queue page</span>
                        <img src={Queue} className="w-12 ml-2" />
                      </CardTitle>
                      <CardDescription className=" text-center">
                        Wait until moderator decides to start the session
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <h2 className="text-center text-xl font-bold">
                        Key aspects:
                      </h2>

                      <ul className="list-disc">
                        <li>
                          Waiting Area: Users wait in the queue page before the
                        </li>
                        <br />
                        <li>
                          session starts. View Active Users: Users can see other
                        </li>
                        <br />
                        <li>
                          active users also in the queue. Session Start: Admin
                          can
                        </li>
                        <br />
                        <li>
                          {" "}
                          start the session, initiating the ideation process.
                        </li>
                        <br />
                      </ul>
                    </CardContent>
                  </>
                ) : currStep == 0 &&
                  session?.ideation_technique == "brain_storming" ? (
                  <>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center">
                        <span>Idea submission</span>
                        <img src={brainstorming} className="w-12 ml-2" />
                      </CardTitle>
                      <CardDescription className=" text-center">
                        Brain storming session
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <h2 className="text-center text-xl font-bold">
                        Key aspects:
                      </h2>

                      <ul className="list-disc">
                        <li>Rounds System: Users submit ideas in rounds.</li>
                        <br />
                        <li>
                          Color-Coded Cards: Each user has a specific card color
                          for identification.{" "}
                        </li>
                        <br />
                        <li>Submission Limit: Users can submit only once.</li>
                        <br />
                        <li>
                          Submission Timeframe: Ideas submitted in allowed time.
                        </li>
                        <li>
                          Late Submission Handling: If time's up and no
                          submission, idea is blank.
                        </li>
                        <br />
                        <li>
                          Review Previous Ideas: Users can see others' ideas in
                          the same column and comment.
                        </li>
                        <li>
                          Chatbot for Idea Generation: Users can use a chatbot
                          to generate ideas.
                        </li>
                      </ul>
                    </CardContent>
                  </>
                ) : currStep == 0 &&
                  session?.ideation_technique == "brain_writing" ? (
                  <>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center">
                        <span>Idea submission</span>
                        <img src={brainwriting} className="w-12 ml-2" />
                      </CardTitle>
                      <CardDescription className=" text-center">
                        Brain writing session
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <h2 className="text-center text-xl font-bold">
                        Key aspects:
                      </h2>

                      <ul className="list-disc">
                        <li>
                          Real-time Idea Submission: Users' ideas are instantly
                          added to their carousel.
                        </li>
                        <br />
                        <li>
                          Color-Coded Cards: Each user has a specific card color
                          for identification.{" "}
                        </li>
                        <br />
                        <li>
                          Submission Limit: Users can submit only once in each
                          round.
                        </li>
                        <br />
                        <li>
                          Submission Timeframe: Ideas submitted in allowed time.
                        </li>
                        <br />
                        <li>
                          Late Submission Handling: If time's up and no
                          submission, idea is blank.
                        </li>
                        <br />
                        <li>
                          Chatbot for Idea Generation: Users can use a chatbot
                          to generate ideas.
                        </li>
                      </ul>
                    </CardContent>
                  </>
                ) : currStep == 1 ? (
                  <>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center">
                        <span>Idea development</span>
                        <img src={TeamWork} className="w-12 ml-2" />
                      </CardTitle>
                      <CardDescription className=" text-center">
                        Develop your ideas collectively
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <h2 className="text-center text-xl font-bold">
                        Key aspects:
                      </h2>

                      <ul className="list-disc">
                        <li>
                          Comments and Chat: Users can comment on others' ideas
                          and chat.
                        </li>
                        <br />
                        <li>
                          Moderator Actions: Moderator can combine, extend,
                          delete, and refine ideas.
                        </li>
                        <br />
                        <li>
                          Moderator Control: Decides when to end the phase and
                          move to voting.
                        </li>
                        <br />
                        <li>
                          Combining Ideas: Moderator selects ideas to combine.
                          Creates a new combined idea, added to the combined
                          ideas section.
                        </li>
                        <br />
                        <li>
                          Refinement: Users can refine ideas by modifying their
                          content.
                        </li>
                        <br />
                        <li>
                          Expansion: Users can expand an idea's content.
                          Expanded ideas are added to the expanded ideas
                          section, visible in real-time.
                        </li>
                        <br />
                        <li>
                          Deletion: Moderator can delete ideas. Deleted ideas
                          are marked with grey color.
                        </li>
                      </ul>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center">
                        <span>Ideas voting</span>
                        <img src={TeamWork} className="w-12 ml-2" />
                      </CardTitle>
                      <CardDescription className=" text-center">
                        Vote on your ideas collectively
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <h2 className="text-center text-xl font-bold">
                        Key aspects:
                      </h2>

                      <ul className="list-disc">
                        <li>
                          Voting Process: Users vote by clicking on the button
                          on the idea card. Real-time results are displayed for
                          users to see.
                        </li>
                        <br />
                        <li>
                          Final Idea Selection: Moderator selects final ideas by
                          clicking on the decision button. Final decisions are
                          marked with a star sign.
                        </li>
                        <br />
                        <li>
                          Session Completion: At the end of the session, users
                          are redirected to the session page. Users can
                          visualize all ideas submitted during the session.
                        </li>
                      </ul>
                    </CardContent>
                  </>
                )}

                {/*  */}
              </Card>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        {/* test which step */}
        <div className="fixed bottom-4 left-4 flex flex-row-reverse">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleButtonClick(1)}
                >
                  <img
                    src={Chatbot}
                    alt="Chatbot"
                    className="h-6 w-6 inline-block mr-2"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chatbot</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleButtonClick(2)}
                >
                  <img
                    src={Chat}
                    alt="Chat"
                    className="h-6 w-6 inline-block mr-2"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chat with project members</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {showChat1 && (
        <div className={`fixed top-36 z-40`}>
          <ChatArea
            name="ChatBot"
            right={20}
            bottom={20}
            messages={chatBotMessages.map((msg, index) => {
              switch (msg.user_id) {
                case userId: {
                  return (
                    <SentMessage
                      key={index}
                      user={users.get(userId) as UserResponse}
                      message={msg.msg}
                    />
                  );
                }
                default: {
                  return (
                    <ReceivedMessage
                      key={index}
                      user={users.get(msg.user_id) as UserResponse}
                      message={msg.msg}
                    />
                  );
                }
              }
            })}
            send={handleBotMessage}
            close={() => setShowChat1(false)}
          />
        </div>
      )}
      {showChat2 && (
        <div className={`fixed top-36 z-40`}>
          <ChatArea
            name="Chat"
            messages={sessionMessages.map((msg, index) => {
              switch (msg.user_id) {
                case userId: {
                  return (
                    <SentMessage
                      key={index}
                      user={users.get(userId) as UserResponse}
                      message={msg.msg}
                    />
                  );
                }
                default: {
                  return (
                    <ReceivedMessage
                      key={index}
                      user={users.get(msg.user_id) as UserResponse}
                      message={msg.msg}
                    />
                  );
                }
              }
            })}
            right={70}
            bottom={70}
            send={(msg: string) => {
              ws?.sendMessage(msg);
            }}
            close={() => setShowChat2(false)}
          />
        </div>
      )}
    </div>
  );
};

export default SessionChat;

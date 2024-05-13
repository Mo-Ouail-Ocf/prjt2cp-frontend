import  { useEffect, useState } from "react";
import ChatArea, { SentMessage, ReceivedMessage } from "./components/Chat";
import Chatbot from "./assets/chatbot.png";
import Chat from "./assets/chat.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserResponse } from "./apiClient/data-contracts";
import { useUserStore } from "./store/userStore";
import { useSessionStore } from "./store/sessionStore";
import { useChatStore } from "./store/chatStore";
import { useWsStore } from "./store/wsStore";
import v1Client from "./apiClient";
/* this the well positioned 2 chats and buttons to use within our ideation sessions*/

const handleBotMessage = async (msg: string) => {
  const userId = useSessionStore.getState().userId;
  useChatStore.setState(state => {
    state.chatBotMessages.push({user_id: userId, msg: msg})
  })

  const res = await v1Client.generateIdeasV1BotGenerateIdeasPost({topic: msg})
  res.data.map((idea: string) => {
    if (idea != "") {
      useChatStore.setState(state => {
        state.chatBotMessages.push({user_id: 0, msg: idea})
      })
    }
  })

}

const SessionChat = () => {
  const [showChat1, setShowChat1] = useState(false);
  const [showChat2, setShowChat2] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const users = useUserStore(state => state.users)
  const userId = useSessionStore(state => state.userId)
  const sessionMessages = useChatStore(state => state.sessionMessages)
  const chatBotMessages = useChatStore(state => state.chatBotMessages)
  const ws = useWsStore(state => state.ws)

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
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Help
        </button>
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
        <div className={`fixed top-36`}>
          <ChatArea
            name="ChatBot"
            right={20}
            bottom={20}
            messages={
              chatBotMessages.map((msg, index) => {
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
            })
            }
            send={handleBotMessage}
            close={() => setShowChat1(false)}
          />
        </div>
      )}
      {showChat2 && (
        <div className={`fixed top-36`}>
          <ChatArea
            name="Chat"
            messages={
              sessionMessages.map((msg, index) => {
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
            send={(msg: string) => {ws?.sendMessage(msg)}}
            close={() => setShowChat2(false)}
          />
        </div>
      )}
    </div>
  );
};

export default SessionChat;

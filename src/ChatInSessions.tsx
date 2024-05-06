import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ChatArea, { SentMessage, ReceivedMessage } from "./components/Chat";
import Chatbot from "./assets/chatbot.png";
import Chat from "./assets/chat.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
/* this the well positioned 2 chats and buttons to use within our ideation sessions*/
const Essaibutton = () => {
  const [showChat1, setShowChat1] = useState(false);
  const [showChat2, setShowChat2] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    console.log(screenWidth);

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
            name="Chat 1"
            children={
              <SentMessage
                user={{ name: "User 1", pfp: "/path/to/image" }}
                message="Hello from User 1"
              />
            }
            right={20}
            bottom={20}
            send={(msg: string) =>
              console.log("Sending message from Chat 1:", msg)
            }
            close={() => setShowChat1(false)}
          />
        </div>
      )}
      {showChat2 && (
        <div className={`fixed top-36`}>
          <ChatArea
            name="Chat 2"
            children={
              <ReceivedMessage
                user={{ name: "User 2", pfp: "/path/to/image" }}
                message="Hello from User 2"
              />
            }
            right={70}
            bottom={70}
            send={(msg: string) =>
              console.log("Sending message from Chat 2:", msg)
            }
            close={() => setShowChat2(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Essaibutton;

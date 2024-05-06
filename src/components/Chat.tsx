import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { UserResponse } from "@/apiClient/data-contracts.ts"
import { useState } from "react";
import { useRef } from 'react';


export interface ChatProps {
  name: string,
  children: SentMessage | ReceivedMessage;
  right: number,
  bottom: number,
  send: (msg: string) => void,
  close: () => void,
}

export interface ChatMessageProps {
  user: UserResponse,
  message: string,
}


const ChatArea = (props: ChatProps) => {
  const [msg, setMsg] = useState("");
  const sa = useRef(null);

  const submit = (e) => {
    if (msg != "") {
      props.send(msg);
      setMsg("")
      sa.current.children[1].scrollTop = sa.current.children[1].scrollHeight;
    }
    e.preventDefault();
  }

  return (
    <div className={"absolute right-" + props.right + " bottom-" + props.bottom}>
        <Card className="max-w-sm min-w-96">
          <CardHeader className="p-0 mr-1 flex-row justify-between">
            <CardTitle className="m-2">{props.name}</CardTitle>
            <Button className="max-h-8 max-w-8 text-base" onClick={props.close}>X</Button>
          </CardHeader>
          <Separator className="my"/>
          <CardContent className="p-1">
            <ScrollArea className="h-96 p-3" ref={ref => sa.current = ref}>
              {props.children}
            </ScrollArea>
          </CardContent>
          <Separator className="my" />
          <CardFooter className="p-1">
            <form className="flex w-full" onSubmit={submit}>
              <Input id="msg" placeholder="Enter a message." className="mr-1 max-h-10" value={msg} onChange={e => setMsg(e.target.value)}/>
              <Button type="submit" className="ml-1 max-h-10">Send</Button>
            </form>
          </CardFooter>
        </Card>
    </div>
  )
}


export const ReceivedMessage = (props: ChatMessageProps) => {
  return (
    <div className="flex items-center mb-2">
      <Avatar className="max-h-8 max-w-8 mr-2">
        <AvatarImage src={props.user.pfp} alt={props.user.name} />
        <AvatarFallback>TK</AvatarFallback>
      </Avatar>
      <p className="text-lg bg-red-50 max-h-8 hyphens-auto rounded-lg p-1">{props.message}</p>
    </div>
  )
}


export const SentMessage = (props: ChatMessageProps) => {
  return (
    <div className="flex items-center justify-end mb-2">
      <p className="text-lg bg-red-50 hyphens-auto rounded-lg p-1">{props.message}</p>
      <Avatar className="max-h-8 max-w-8 ml-2">
        <AvatarImage src={props.user.pfp} alt={props.user.name} />
        <AvatarFallback>TK</AvatarFallback>
      </Avatar>
    </div>
    )
}

export default ChatArea; 

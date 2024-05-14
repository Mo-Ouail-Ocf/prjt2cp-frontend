import { create } from "zustand";
import { ChatBroadCast } from "../session/ws-data-contracts";
import { immer } from "zustand/middleware/immer";



type State = {
    sessionMessages: ChatBroadCast[],
    chatBotMessages: ChatBroadCast[],
}

type Action = {};


export const useChatStore = create<State & Action>()(
  immer((_set) => ({
    sessionMessages: [],
    chatBotMessages: [],
  }))
);
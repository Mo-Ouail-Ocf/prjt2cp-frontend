import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import WSClient from "../session/ws";



type State = {
    ws: WSClient | null
}

type Action = {
}


export const useWsStore = create<State & Action>()(immer(
    (set) => ({
        ws: null,
    })
))
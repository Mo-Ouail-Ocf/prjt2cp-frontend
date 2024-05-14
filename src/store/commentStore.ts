import { create } from "zustand";
import { CommentResponse } from "../session/ws-data-contracts";
import { immer } from "zustand/middleware/immer";



type State = {
    comments: Map<number, CommentResponse[]>,
}

type Action = {
}


export const useCommentStore = create<State & Action>()(immer(
    (_set) => ({
        comments: new Map<number, CommentResponse[]>(),
    })
))
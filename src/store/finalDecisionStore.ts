import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { FinalDecisionResponse } from "../session/ws-data-contracts";

enableMapSet();

type State = {
  finalDecisions: Map<number, FinalDecisionResponse>; // ideaId
};

type Action = {};

export const useFinalDecisionStore = create<State & Action>()(
  immer((_set) => ({
    finalDecisions: new Map<number, FinalDecisionResponse>(),
  }))
);

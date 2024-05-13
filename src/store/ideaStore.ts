import { create } from "zustand";
import { IdeaResponse } from "../session/ws-data-contracts";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";

enableMapSet();

type State = {
  ideas: Map<number, IdeaResponse>;
  refinedIdeas: number[];
  expendedIdeas: number[];
  combinedIdeas: Map<number, number[]>;
  ideaMatrix: number[][];
  roundIdeas: number[];
  selected: number[]
};

type Action = {};

export const useIdeaStore = create<State & Action>()(
  immer((_set) => ({
    ideas: new Map<number, IdeaResponse>(),
    refinedIdeas: [],
    expendedIdeas: [],
    combinedIdeas: new Map<number, number[]>(),
    ideaMatrix: [],
    roundIdeas: [],
    selected: []
  }))
);

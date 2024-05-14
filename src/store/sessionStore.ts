import { ProjectDisplay, SessionResponse } from "@/apiClient/data-contracts";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  // metadata
  session: SessionResponse | null;
  project: ProjectDisplay | null;
  mods: number[];
  userId: number;

  // status
  loaded: boolean;
  started: boolean;
  currentStep: number;
  steps: JSX.Element[];
};

export const useSessionStore = create<State>()(
  immer((_set) => ({
    session: null,
    project: null,
    currentStep: 0,
    steps: [],
    started: false,
    mods: [],
    userId: 0,
    loaded: false,
  }))
);

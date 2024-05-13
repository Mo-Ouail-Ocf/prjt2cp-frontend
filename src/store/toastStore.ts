import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  title: string;
  description: string;
  variant: string;
};

export const useToastStore = create<State>()(
  immer((_set) => ({
    title: "",
    description: "",
    variant: "",
  }))
);

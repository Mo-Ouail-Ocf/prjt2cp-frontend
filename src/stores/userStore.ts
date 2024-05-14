import { create } from "zustand";
import v1Client from "@/apiClient";
import { UserResponse } from "@/apiClient/data-contracts";
import { immer } from "zustand/middleware/immer";

type State = {
  user: UserResponse | null;
  loadUser: boolean;
  errorUser: string | null;
  successUser: boolean;
  loadUpdate: boolean;
  successUpdate: boolean;
};

type Action = {
  getUser: () => Promise<void>;
  modifyUserName: (newName: string) => void;
};

export const useUserStore = create<State & Action>()(
  immer((set) => ({
    user: null,
    loadUser: false,
    errorUser: null,
    successUser: false,
    successUpdate: false,
    loadUpdate: false,
    getUser: async () => {
      set((state) => {
        state.loadUser = true;
        state.successUser = false;
      });
      try {
        const response = await v1Client.currentV1UserCurrentGet();
        set((state) => {
          state.user = response.data;
          state.successUser = true;
        });
      } catch (error) {
        set((state) => {
          //@ts-ignore
          state.errorUser = error.message;
        });
      } finally {
        set((state) => {
          state.loadUser = false;
        });
      }
    },
    modifyUserName: async (newName: string) => {
      set((state) => {
        state.loadUpdate = true;
        state.successUpdate = false;
      });
      try {
        const response = await v1Client.nameV1UserNamePut({ name: newName });
        set((state) => {
          state.user = response.data;
          state.successUpdate = true;
        });
      } catch (error) {
        set((state) => {
          //@ts-ignore
          state.errorUser = error.message;
        });
      } finally {
        set((state) => {
          state.loadUpdate = false;
        });
      }
    },
  }))
);

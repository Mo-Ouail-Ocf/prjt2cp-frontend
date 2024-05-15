import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { UserResponse } from "@/apiClient/data-contracts";
import v1Client from "@/apiClient";

enableMapSet();

type State = {
  users: Map<number, UserResponse>;
  userList: number[];
  colors: Map<number, string>;
  predefinedColors: string[];
};

type Action = {};

export const useUserStore = create<State & Action>()(
  immer((_set) => ({
    users: new Map<number, UserResponse>(),

    userList: [],
    colors: new Map<number, string>(),
    predefinedColors: [
      "#3b82f6",
      "#ef476f",
      "#ffd166",
      "#06d6a0",
      "#073b4c",
      "#7209b7",
    ],
  }))
);

export const storeUser = async (userId: number): Promise<UserResponse> => {
  if (useUserStore.getState().users.has(userId)) {
    return useUserStore.getState().users.get(userId) as UserResponse;
  }

  try {
    const res = await v1Client.getUserByIdV1UserUserIdGet(userId);
    const user: UserResponse = res.data;

    useUserStore.setState((state) => {
      state.users.set(userId, user);
    });

    return user;
  } catch {
    throw new Error("Unable to retrieve user data");
  }
};

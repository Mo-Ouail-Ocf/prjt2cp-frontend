import v1Client, { getAccessToken } from "@/apiClient";
import { useSessionStore } from "@/store/sessionStore";
import Brainstorming from "@/pages/Brainstorming";
import IdeaMatrix from "@/pages/IdeaMatrix";
import IdeaVote from "@/pages/ideaVote";
import Brainwriting from "@/pages/Brainwriting";
import { useWsStore } from "@/store/wsStore";
import { useUserStore } from "@/store/userStore";
import WSClient from "./ws";
import {
  ProjectDisplay,
  SessionResponse,
  UserResponse,
} from "@/apiClient/data-contracts";
import { jsx } from "react/jsx-runtime";

export async function setupSession(
  session: SessionResponse,
  project: ProjectDisplay
) {
  useSessionStore.setState((state) => {
    state.session = session;
    state.project = project;
  });

  useWsStore.setState((state) => {
    if (state.ws == null) {
      state.ws = new WSClient(session.session_id);
    }
  });

  const res = await v1Client.currentV1UserCurrentGet();
  useSessionStore.setState((state) => {
    state.userId = res.data.id;
  });

  const chatBot: UserResponse = {
    email: "",
    id: 0,
    name: "ChatBot",
    // TODO: find an image
    pfp: "https://img.icons8.com/?size=256&id=102660&format=png",
  };

  useUserStore.setState((state) => {
    state.users.set(res.data.id, res.data);
    state.users.set(0, chatBot);
  });

  // init mods list
  let mods: number[] = [project.owner_id];
  useSessionStore.setState((state) => {
    state.mods = mods;
  });

  useSessionStore.setState((state) => {
    state.steps = [jsx(IdeaMatrix, {}), jsx(IdeaVote, {})];
    switch (session.ideation_technique) {
      case "brain_writing": {
        state.steps.unshift(jsx(Brainwriting, {}));
        break;
      }
      case "brain_storming": {
        state.steps.unshift(jsx(Brainstorming, {}));
        break;
      }
    }
  });

  const accessToken = await getAccessToken();

  useWsStore.getState().ws?.connect(accessToken);
  useSessionStore.setState((state) => {
    state.loaded = true;
  });
}

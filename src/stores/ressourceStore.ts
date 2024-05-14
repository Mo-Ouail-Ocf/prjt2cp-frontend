import {
  AppSchemeRessourceSchemeResourceDisplay,
  ResourceCreate,
} from "@/apiClient/data-contracts";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import v1Client from "@/apiClient";

type State = {
  ressources: AppSchemeRessourceSchemeResourceDisplay[];
  //load :
  loadRessources: boolean;
  successLoadRessources: boolean;
  errorLoadRessources: string | null;
  //create
  loadCreateRessource: boolean;
  successCreateRessource: boolean;
  errorCreateRessource: string | null;
};

type Action = {
  getRessources: () => Promise<void>;
  createRessource: (ressource: ResourceCreate) => Promise<void>;
};

export const useRessourceStore = create<State & Action>()(
  immer((set) => ({
    ressources: [],
    //load
    loadRessources: false,
    successLoadRessources: false,
    errorLoadRessources: null,
    ////////////////////////////////////////////////////////////////
    getRessources: async () => {
      set((state) => {
        state.loadRessources = true;
        state.successLoadRessources = false;
      });
      try {
        const response = await v1Client.readResourcesV1RessourceGet();
        set((state) => {
          state.ressources = response.data;
          state.successLoadRessources = true;
        });
      } catch (err) {
        set((state) => {
          //@ts-ignore
          state.errorLoadRessources = err.message;
        });
      } finally {
        set((state) => {
          state.loadRessources = false;
        });
      }
    },
    /////////////////////////////////////////////////////////////////
    //create
    loadCreateRessource: false,
    successCreateRessource: false,
    errorCreateRessource: null,
    createRessource: async (ressource: ResourceCreate) => {
      set((state) => {
        state.loadCreateRessource = true;
        state.successCreateRessource = false;
      });
      try {
        const response = await v1Client.createV1RessourcePost(ressource);
        set((state) => {
          state.ressources.push(response.data);
          state.successCreateRessource = true;
        });
      } catch (err) {
        set((state) => {
          //@ts-ignore
          state.errorCreateRessource = err.message;
        });
      } finally {
        set((state) => {
          state.loadCreateRessource = false;
        });
      }
    },
  }))
);

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ProjectDisplay, ProjectCreate } from "@/apiClient/data-contracts";
import v1Client from "@/apiClient";

type State = {
  ownedProjects: ProjectDisplay[];
  participatedProjects: ProjectDisplay[];
  //load :
  loadProjects: boolean;
  successLoadProjects: boolean;
  errorLoadProjects: string | null;
  //create
  loadCreateProjects: boolean;
  successCreateProjects: boolean;
  errorCreateProjects: string | null;
};

type Action = {
  getProjects: () => Promise<void>;
  createProject: (project: ProjectCreate) => Promise<void>;
};

export const useProjectStore = create<State & Action>()(
  immer((set, _get) => ({
    ownedProjects: [],
    participatedProjects: [],
    //load
    loadProjects: false,
    successLoadProjects: false,
    errorLoadProjects: null,
    ////////////////////////////////////////////////////////////////
    getProjects: async () => {
      set((state) => {
        state.loadProjects = true;
        state.successLoadProjects = false;
      });
      try {
        const [owned, participated] = await Promise.all([
          v1Client.readOwnedProjectsV1ProjectUserOwnedGet(),
          v1Client.readParticipatedProjectsV1ProjectUserParticipatedGet(),
        ]);
        set((state) => {
          state.ownedProjects = owned.data;
          state.participatedProjects = participated.data;
          state.successLoadProjects = true;
        });
      } catch (err) {
        set((state) => {
          //@ts-ignore
          state.errorLoadProjects = err.message;
        });
      } finally {
        set((state) => {
          state.loadProjects = false;
        });
      }
    },
    /////////////////////////////////////////////////////////////////
    //create
    loadCreateProjects: false,
    successCreateProjects: false,
    errorCreateProjects: null,
    createProject: async (project: ProjectCreate) => {
      set((state) => {
        state.loadCreateProjects = true;
        state.successCreateProjects = false;
      });
      try {
        const response = await v1Client.createProjectV1ProjectPost(project);
        set((state) => {
          state.ownedProjects.push(response.data);
          state.successCreateProjects = true;
        });
      } catch (err) {
        set((state) => {
          //@ts-ignore
          state.errorCreateProjects = err.message;
        });
      } finally {
        set((state) => {
          state.loadCreateProjects = false;
        });
      }
    },
  }))
);

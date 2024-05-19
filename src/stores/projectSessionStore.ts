import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  ProjectDisplay, ProjectUpdate,
  ProjectInvitationCreate,
  SessionResponse,
  SessionExport
} from "@/apiClient/data-contracts";
import { Node, Edge } from "reactflow";
import v1Client from "@/apiClient";
interface SessionCreate {
  title: string;
  description: string | null;
  /**
   * Ideation Technique
   * @pattern brain_writing|brain_storming
   */
  ideation_technique: string;
  objectives: string | null;
  round_time: number;
  nb_rounds: number;
}

type State = {
  project: ProjectDisplay | null;
  openSessions: SessionResponse[];
  closedSessions: SessionResponse[];
  closedSessionsDetails: SessionExport[];
  initialNodes: Node[];
  initialEdges: Edge[];
  //load :
  loadProject: boolean;
  successLoadProject: boolean;
  errorLoadProject: string | null;
  //edit
  loadEdit: boolean;
  successEdit: boolean;
  errorEdit: string | null;

  //create new session
  loadCreateSession: boolean;
  successCreateSession: boolean;
  errorCreateSession: string | null;
  //invite
  loadInvite: boolean;
  successInvite: boolean;
  errorInvite: string | null;
  responseInvite: string;
  loadNodes: boolean;
};

type Action = {
  getProject: (projectId: number) => Promise<void>;
  editProject: (projectId: number, newProject: ProjectUpdate) => Promise<void>;
  createSession: (
    projectId: number,
    newSession: SessionCreate
  ) => Promise<void>;
  inviteUser: (
    projectId: number,
    userEmail: ProjectInvitationCreate
  ) => Promise<void>;
  createSessionFromFinalDecision: (
    projectId: number,
    finalDecisionId: number,
    data: SessionCreate
  ) => Promise<void>;
  buildNodesAndEdges: () => void;
};

export const useProjectSessionStore = create<State & Action>()(
  immer((set, get) => ({
    project: null,
    openSessions: [],
    closedSessions: [],
    //load
    closedSessionsDetails: [],
    loadProject: true,
    successLoadProject: false,
    errorLoadProject: null,
    getProject: async (projectId: number) => {
      set((state) => {
        state.loadProject = true;
        state.successLoadProject = false;
        state.project = null;
        state.openSessions = [];
        state.closedSessions = [];
        state.closedSessionsDetails = [];
      });
      try {
        const [open, closed, details] = await Promise.all([
          v1Client.getOpenSessionsForAProjectV1SessionProjectProjectIdGet(
            projectId
          ),
          v1Client.getClosedSessionsForAProjectV1SessionProjectProjectIdClosedGet(
            projectId
          ),
          v1Client.getDetailsV1ProjectProjectIdGet(projectId),
        ]);
        set((state) => {
          state.closedSessions = closed.data;
          state.openSessions = open.data;
          state.project = details.data;
          state.successLoadProject = true;
        });
        for (let i = 0; i < get().closedSessions.length; i++) {
          const response =
            await v1Client.sessionAsJsonV1SessionExportSessionIdGet(
              get().closedSessions[i].session_id
            );
          set((state) => {
            state.closedSessionsDetails.push(response.data);
          });
        }
      } catch (err) {
        set((state) => {
          //@ts-ignore
          state.errorLoadProject = err.message;
        });
      } finally {
        set((state) => {
          state.loadProject = false;
        });
      }
    },
    //edit
    loadEdit: false,
    successEdit: false,
    errorEdit: null,
    editProject: async (projectId: number, newProject: ProjectUpdate) => {
      set((state) => {
        state.loadEdit = true;
        state.successEdit = false;
      });
      try {
        const response = await v1Client.updateProjectV1ProjectProjectIdPut(
          projectId,
          newProject
        );
        set((state) => {
          state.project = response.data;
          state.successEdit = true;
        });
      } catch (err) {
        set((state) => {
          //@ts-ignore
          state.errorEdit = err.message;
        });
      } finally {
        set((state) => {
          state.loadEdit = false;
        });
      }
    },
    //create session
    loadCreateSession: false,
    successCreateSession: false,
    errorCreateSession: null,
    createSession: async (projectId: number, newSession: SessionCreate) => {
      set((state) => {
        state.loadCreateSession = true;
        state.successCreateSession = false;
      });
      try {
        const response =
          await v1Client.createASessionV1SessionProjectProjectIdPost(
            projectId,
            newSession
          );
        set((state) => {
          state.openSessions.push(response.data);
          state.successCreateSession = true;
        });
      } catch (err) {
        set((state) => {
          //@ts-ignore
          state.errorCreateSession = err.message;
        });
      } finally {
        set((state) => {
          state.loadCreateSession = false;
        });
      }
    },
    //invite
    loadInvite: false,
    successInvite: false,
    errorInvite: null,
    responseInvite: "",
    inviteUser: async (
      projectId: number,
      userEmail: ProjectInvitationCreate
    ) => {
      set((state) => {
        state.loadInvite = true;
        state.successInvite = false;
      });
      try {
        const response = await v1Client.inviteV1ProjectProjectIdInvitePut(
          //@ts-ignore
          projectId,
          userEmail
        );
        set((state) => {
          state.responseInvite = response.data.message;
        });
        const updateProject = await v1Client.getDetailsV1ProjectProjectIdGet(
          projectId
        );
        set((state) => {
          state.project = updateProject.data;
          state.successInvite = true;
        });
      } catch (err) {
        set((state) => {
          //@ts-ignore
          state.errorInvite = err.message;
        });
      } finally {
        set((state) => {
          state.loadInvite = false;
        });
      }
    },
    createSessionFromFinalDecision: async (
      projectId: number,
      finalDecisionId: number,
      newSession: SessionCreate
    ) => {
      set((state) => {
        state.loadCreateSession = true;
        state.successCreateSession = false;
      });
      try {
        const response =
          await v1Client.createSessionFromFinalDecisionV1SessionFromDecisionProjectIdDecisionIdPost(
            finalDecisionId,
            projectId,
            newSession
          );
        set((state) => {
          state.openSessions.push(response.data);
          state.successCreateSession = true;
        });
      } catch (err) {
        set((state) => {
          //@ts-ignore
          state.errorCreateSession = err.message;
        });
      } finally {
        set((state) => {
          state.loadCreateSession = false;
        });
      }
    },
    initialEdges: [],
    initialNodes: [],
    loadNodes: true,
    buildNodesAndEdges: () => {
      //the root : the project

      set((state) => {
        state.initialEdges = [];
        state.initialNodes = [];
        state.loadNodes = true;
        state.initialNodes.push({
          id: "project" + get().project?.project_id.toString(),
          type: "textUpdater",
          position: { x: 100, y: 100 },
          data: {
            project: get().project,
            type: "project",
          },
        });
      });
      // 1. traverse the closed sessions projects :
      get().closedSessionsDetails.forEach((closedSession) => {
        // 2. It is cretaed from idea : go to 1
        // 3. Create the session node , session-project link , start creating session links and nodes (same algo as in closedSessionStore)
        if (closedSession.metadata.is_from_final_decision == false) {
          set((state) => {
            state.initialNodes.push({
              //@ts-ignore
              id: "session" + closedSession.metadata.session_id.toString(),
              type: "textUpdater",
              position: { x: 100, y: 100 },
              data: {
                session: closedSession.metadata,
                type: "session",
              },
            });
            state.initialEdges.push({
              //@ts-ignore
              id:
                "edge-project-session" +
                closedSession.metadata.session_id.toString(),
              //@ts-ignore
              source: "project" + get().project?.project_id.toString(),
              target: "session" + closedSession.metadata.session_id.toString(),
            });
          });
          //link final ideas to the closed session , gonna take some place so dont be surprised
          closedSession.final_decisions.forEach((finalDecision) => {
            const idea = closedSession.ideas.find(
              (idea) => idea.idea_id === finalDecision.idea_id
            );
            set((state) => {
              state.initialNodes.push({
                //@ts-ignore
                id: "finalDecision" + finalDecision.decision_id.toString(),
                type: "textUpdater",
                position: { x: 100, y: 100 },
                data: {
                  finalDecision: finalDecision,
                  type: "finalDecision",
                  idea: idea,
                },
              });
              state.initialEdges.push({
                //@ts-ignore
                id: "edge-session-idea" + finalDecision.decision_id.toString(),
                //@ts-ignore
                source:
                  "session" + closedSession.metadata.session_id.toString(),
                target: "finalDecision" + finalDecision.decision_id.toString(),
              });
            });
            if (finalDecision.new_session_id != null) {
              //let the fun begin here
              const relatedSessionDetails = get().closedSessionsDetails.find(
                (relatedSession) =>
                  relatedSession.metadata.session_id ==
                  finalDecision.new_session_id
              );
              if (relatedSessionDetails != undefined) {
                set((state) => {
                  state.initialNodes.push({
                    //@ts-ignore
                    id: "session" + finalDecision.new_session_id.toString(),
                    type: "textUpdater",
                    position: { x: 100, y: 100 },
                    data: {
                      session: relatedSessionDetails?.metadata,
                      type: "session",
                    },
                  });
                  state.initialEdges.push({
                    id:
                      "edge-idea-session" +
                      finalDecision.decision_id.toString(),
                    //@ts-ignore
                    source:
                      "finalDecision" + finalDecision.decision_id.toString(),
                    //@ts-ignore
                    target: "session" + finalDecision.new_session_id.toString(),
                  });
                });
                // add that related session ideas to the graph
                //@ts-ignore
                relatedSessionDetails.final_decisions.forEach(
                  (finalRelatedDecision) => {
                    //@ts-ignore
                    const idea = relatedSessionDetails.ideas.find(
                      (idea) => idea.idea_id === finalRelatedDecision.idea_id
                    );
                    set((state) => {
                      state.initialNodes.push({
                        //@ts-ignore
                        id:
                          "finalDecision" +
                          finalRelatedDecision.decision_id.toString(),
                        type: "textUpdater",
                        position: { x: 100, y: 100 },
                        data: {
                          finalDecision: finalRelatedDecision,
                          type: "finalDecision",
                          idea: idea,
                        },
                      });
                      state.initialEdges.push({
                        //@ts-ignore
                        id:
                          "edge-session-idea" +
                          finalRelatedDecision.decision_id.toString(),
                        //@ts-ignore
                        source:
                          "session" +
                          relatedSessionDetails?.metadata.session_id.toString(),
                        target:
                          "finalDecision" +
                          finalRelatedDecision.decision_id.toString(),
                      });
                    });
                  }
                );
              }
            }
          });
        }
      });
      const uniqueArray = get().initialNodes.filter(
        (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
      );
      const uniqueEdges = get().initialEdges.filter(
        (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
      );
      set((state) => {
        state.initialNodes = [...uniqueArray];
        state.initialEdges = [...uniqueEdges];
        state.loadNodes = false;
      });
    },
  }))
);

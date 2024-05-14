import v1Client from "@/apiClient";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import ReactFlow, { Node, Edge } from "reactflow";
import { SessionExport, SessionResponse } from "@/apiClient/data-contracts";

type State = {
  closedSession: SessionResponse | null;
  RelatedClosedSessionsDetails: SessionExport[];
  closedSessionDetails: SessionExport | null;
  //load :
  loadSession: boolean;
  successLoadSession: boolean;
  errorLoadSession: string | null;
  initialNodes: Node[];
  initialEdges: Edge[];
};

type Action = {
  getSession: (sessionId: number) => Promise<void>;
  buildNodesAndEdges: () => void;
};

export const useClosedSessionStore = create<State & Action>()(
  immer((set, get) => ({
    RelatedClosedSessionsDetails: [],
    closedSession: null,
    closedSessionDetails: null,
    loadSession: true,
    successLoadSession: false,
    errorLoadSession: null,
    initialNodes: [],
    initialEdges: [],
    getSession: async (sessionId: number) => {
      set((state) => {
        state.loadSession = true;
        state.successLoadSession = false;
        state.RelatedClosedSessionsDetails = [];
      });
      try {
        const [sessionResponse, detailsResponse] = await Promise.all([
          v1Client.getSessionByIdV1SessionSessionIdGet(sessionId),
          v1Client.sessionAsJsonV1SessionExportSessionIdGet(sessionId),
        ]);
        set((state) => {
          state.closedSession = sessionResponse.data;
          state.closedSessionDetails = detailsResponse.data;
        });
        //look for related closed sessions
        const relatedSessions = detailsResponse.data.final_decisions.filter(
          (finalDecision) => finalDecision.new_session_id != null
        );
        //look for related sessions and get closed ones
        for (let i = 0; i < relatedSessions.length; i++) {
          const response =
            await v1Client.sessionAsJsonV1SessionExportSessionIdGet(
              //@ts-ignore
              relatedSessions[i].new_session_id
            );
          if (response.data.metadata.session_status === "closed") {
            set((state) => {
              state.RelatedClosedSessionsDetails.push(response.data);
            });
          }
          if (i == relatedSessions.length - 1) {
            set((state) => {
              state.successLoadSession = true;
            });
          }
        }
      } catch (err) {
        set((state) => {
          //@ts-ignore
          state.errorLoadSession = err.message;
        });
      } finally {
        set((state) => {
          state.loadSession = false;
        });
      }
    },
    buildNodesAndEdges: () => {
      set((state) => {
        state.initialNodes = [];
        state.initialEdges = [];
        state.initialNodes.push({
          //@ts-ignore
          id: "session" + get().closedSession?.session_id?.toString(),
          type: "textUpdater",
          position: { x: 100, y: 100 },
          data: {
            session: get().closedSession,
            type: "session",
          },
        });
      });
      get().closedSessionDetails?.final_decisions.forEach((finalDecision) => {
        const idea = get().closedSessionDetails?.ideas.find(
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
            id: "edge" + finalDecision.decision_id.toString(),
            //@ts-ignore
            source: "session" + get().closedSession?.session_id?.toString(),
            target: "finalDecision" + finalDecision.decision_id.toString(),
          });
        });
        if (finalDecision.new_session_id != null) {
          //let the fun begin here
          const relatedSessionDetails = get().RelatedClosedSessionsDetails.find(
            (relatedSession) =>
              relatedSession.metadata.session_id == finalDecision.new_session_id
          );
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
              id: "edge" + finalDecision.decision_id.toString(),
              //@ts-ignore
              source: "finalDecision" + finalDecision.decision_id.toString(),
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
                  id: "edge" + finalRelatedDecision.decision_id.toString(),
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
        set((state) => {
          state.loadSession = false;
        });
      });
    },
  }))
);

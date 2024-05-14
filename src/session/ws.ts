import { messageHandler } from "./handlers.ts";
import { BroadCast } from "./ws-data-contracts.ts";

const backendDomain = "localhost:8000";

export default class WSClient {
  sessionId: number = 0;

  ws: WebSocket | null = null;
  messageHandler: (data: BroadCast) => void = messageHandler;

  constructor(sessionId: number) {
    this.sessionId = sessionId;
  }

  connect(accessToken: string) {
    if (this.ws != null) {
      return;
    }

    this.ws = new WebSocket(
      `ws://${backendDomain}/v1/ws/` +
        this.sessionId +
        "?access_token=" +
        accessToken
    );

    this.ws.onmessage = (event) => {
      const data: BroadCast = JSON.parse(JSON.parse(event.data));
      this.messageHandler(data);

      event.preventDefault();
    };

    this.ws.onclose = () => {
      this.ws = null;
    };

    this.ws.onopen = () => {};

    this.ws.onerror = () => {};
  }

  disconnect() {
    if (this.ws != null) {
      this.ws.close();
    }
  }

  sendWSMessage(data: Object) {
    if (this.ws == null) return;

    this.ws.send(JSON.stringify(data));
  }

  send_sys_event(event: string) {
    const data = {
      type: "sys_event",
      content: {
        event: event,
      },
    };
    this.sendWSMessage(data);
  }

  startSession() {
    this.send_sys_event("start");
  }

  closeSession() {
    this.send_sys_event("close");
  }

  startNext() {
    this.send_sys_event("next");
  }

  sendMessage(msg: string) {
    const data = {
      type: "chat",
      content: {
        msg: msg,
      },
    };
    this.sendWSMessage(data);
  }

  sendIdea(
    content: string,
    details: string | null = null,
    ideaParent: number | null = null,
    ideaType: string = ""
  ) {
    const data = {
      type: "idea",
      content: {
        content: content,
        parent_idea_id: ideaParent,
        details: details,
        idea_type: ideaType,
      },
    };
    this.sendWSMessage(data);
  }

  sendIdeaUpdate(
    ideaId: number,
    content: string | null = null,
    details: string | null = null,
    deleted: boolean = false
  ) {
    const data = {
      type: "idea_update",
      content: {
        idea_id: ideaId,
        content: content,
        details: details,
        deleted: deleted,
      },
    };
    this.sendWSMessage(data);
  }

  sendComment(ideaId: number, comment: string) {
    const data = {
      type: "comment",
      content: {
        idea_id: ideaId,
        content: comment,
      },
    };
    this.sendWSMessage(data);
  }

  sendCombinedIdea(content: string, details: string, sourceIdeaIds: number[]) {
    const data = {
      type: "combined_idea",
      content: {
        idea: {
          content: content,
          details: details,
          parent_idea_id: null,
        },
        source_idea_ids: sourceIdeaIds,
      },
    };
    this.sendWSMessage(data);
  }

  sendVote(ideaId: number) {
    const data = {
      type: "vote",
      content: {
        idea_id: ideaId,
      },
    };
    this.sendWSMessage(data);
  }

  sendFinalDecision(ideaId: number, rationale: string) {
    const data = {
      type: "final_decision",
      content: {
        rationale: rationale,
        idea_id: ideaId,
      },
    };
    this.sendWSMessage(data);
  }
}

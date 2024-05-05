import { BroadCast } from "./ws-data-contracts.ts";


export default class WSClient {
    session_id: number;
    ws;
    message_handler: (data: BroadCast) => void;

    constuctor(session_id: number, message_handler: (data: BroadCast) => void) {
        this.session_id = session_id;
        this.message_handler = message_handler;
        this.ws = null;
    }

    connect(access_token: string) {
        this.ws = new WebSocket("ws://localhost:8000/v1/ws/" + session_id + "?access_token=" + access_token);

        this.ws.onmessage = (event) => {
            const data: BoardCast = JSON.parse(JSON.parse(event.data));
            this.message_handler(data);

            event.preventDefault();
        }

        this.ws.onclose = () => {
            this.ws = null;
        }

        // this.ws.onerror = () => {}
    }

    disconnet() {
        if (this.ws != null) {
            this.ws.close()
        }
    }

    send_sys_event(event: string) {
        const data = {
            type: "sys_event",
            content: {
                event: event
            }
        }
        this.ws.send(JSON.stringify(data))
    }

    startSession() {
        this.send_sys_event("start")
    }

    closeSession() {
        this.send_sys_event("close")
    }

    startNext() {
        this.send_sys_event("next")
    }

    sendMessage(msg: string) {
        const data = {
            type: "chat",
            content: {
                msg: msg,
            }
        }
        this.ws.send(JSON.stringify(data))
    }

    sendIdea(idea_content: string, details: string | null, idea_parent: number | null) {
        const data = {
            type: "idea",
            content: {
                content: idea_content,
                parent_idea_id: idea_parent,
                details: details,
            }
        }
        this.ws.send(JSON.stringify(data))
    }

    sendComment(idea_id: number, comment_content: string) {
        const data = {
            type: "comment",
            content: {
                idea_id: idea_id,
                content: comment_content,
            }
        }
        this.ws.send(JSON.stringify(data))
    }

    sendCombinedIdea(combined_idea_id: number, source_idea_id: number) {
        const data = {
            type: "combined_idea",
            content: {
                source_idea_id: source_idea_id,
                combined_idea_id: combined_idea_id,
            }
        }
        this.ws.send(JSON.stringify(data))
    }

    sendVote(idea_id: number) {
        const data = {
            type: "vote",
            content: {
                idea_id: idea_id,
            }
        }
        this.ws.send(JSON.stringify(data))
    }

    sendFinalDecision(idea_id: number, rationale: string) {
        const data = {
            type: "final_decision",
            content: {
                rationale: rationale,
                idea_id: idea_id,
            }
        }
        this.ws.send(JSON.stringify(data))
    }
}

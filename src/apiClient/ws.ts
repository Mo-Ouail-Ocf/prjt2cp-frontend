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

    start_session() {
        const data = {
            type: "sys_event",
            content: {
                event: "start"
            }
        }
        this.ws.send(JSON.stringify(data))
    }

    close_session() {
        const data = {
            type: "sys_event",
            content: {
                event: "close"
            }
        }
        this.ws.send(JSON.stringify(data))
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

    sendComment(comment_idea_id: number, comment_content: string) {
        const data = {
            type: "comment",
            content: {
                idea_id: comment_idea_id,
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

    sendFinalDecision(final_decision_idea_id: number, final_decision_rationale: string) {
        const data = {
            type: "final_decision",
            content: {
                rationale: final_decision_rationale,
                idea_id: final_decision_idea_id,
            }
        }
        this.ws.send(JSON.stringify(data))
    }
}

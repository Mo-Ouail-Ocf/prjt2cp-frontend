/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** BroadCast */
export interface BroadCast {
  /**
   * Type
   * @pattern chat|idea|combined_idea|comment|vote|sys_event|final_decision
   */
  type: string;
  /** Content */
  content:
    | ChatBroadCast
    | IdeaResponse
    | CombinedIdeaResponse
    | CommentResponse
    | Vote
    | SysEventBroadcast
    | FinalDecisionResponse;
}

/** ChatBroadCast */
export interface ChatBroadCast {
  /** Msg */
  msg: string;
  /** User Id */
  user_id: number;
}

/** ChatMessage */
export interface ChatMessage {
  /** Msg */
  msg: string;
}

/** CombinedIdeaCreate */
export interface CombinedIdeaCreate {
  /** Combined Idea Id */
  combined_idea_id: number;
  /** Source Idea Id */
  source_idea_id: number;
}

/** CombinedIdeaResponse */
export interface CombinedIdeaResponse {
  /** Combined Idea Id */
  combined_idea_id: number;
  /** Source Idea Id */
  source_idea_id: number;
}

/** CommentRequest */
export interface CommentRequest {
  /** Idea Id */
  idea_id: number;
  /** Content */
  content: string;
}

/** CommentResponse */
export interface CommentResponse {
  /** Idea Id */
  idea_id: number;
  /** Content */
  content: string;
  /** Author Id */
  author_id: number;
  /** Comment Id */
  comment_id: number;
  /**
   * Creation Date
   * @format date-time
   */
  creation_date: string;
}

/** FinalDecisionRequest */
export interface FinalDecisionRequest {
  /** Rationale */
  rationale: string;
  /** Idea Id */
  idea_id: number;
}

/** FinalDecisionResponse */
export interface FinalDecisionResponse {
  /** Rationale */
  rationale: string;
  /** Idea Id */
  idea_id: number;
  /** Session Id */
  session_id: number;
  /** Decision Id */
  decision_id: number;
  /**
   * Decision Date
   * @format date-time
   */
  decision_date: string;
}


/** IdeaRequest */
export interface IdeaRequest {
  /** Content */
  content: string;
  /** Details */
  details: string | null;
  /** Parent Idea Id */
  parent_idea_id: number | null;
}

/** IdeaResponse */
export interface IdeaResponse {
  /** Content */
  content: string;
  /** Details */
  details: string | null;
  /** Parent Idea Id */
  parent_idea_id: number | null;
  /** Submitter Id */
  submitter_id: number;
  /** Session Id */
  session_id: number;
  /** Idea Id */
  idea_id: number;
  /**
   * Creation Date
   * @format date-time
   */
  creation_date: string;
  /** Votes */
  votes: number | null;
  /** Deleted */
  deleted: boolean;
}

/** IdeaUpdateWS */
export interface IdeaUpdateWS {
  /** Content */
  content: string | null;
  /** Details */
  details: string | null;
  /**
   * Deleted
   * @default false
   */
  deleted?: boolean;
  /** Idea Id */
  idea_id: number;
}


/** Message */
export interface Message {
  /**
   * Type
   * @pattern chat|idea|idea_update|combined_idea|comment|vote|sys_event|final_decision
   */
  type: string;
  /** Content */
  content:
    | ChatMessage
    | IdeaRequest
    | IdeaUpdateWS
    | CombinedIdeaCreate
    | CommentRequest
    | SysEvent
    | FinalDecisionRequest
    | Vote
    | null;
}


/** SysEvent */
export interface SysEvent {
  /**
   * Event
   * @pattern join|joined|start|close|quit
   */
  event: string;
}

/** SysEventBroadcast */
export interface SysEventBroadcast {
  /**
   * Event
   * @pattern join|joined|start|close|quit
   */
  event: string;
  /** Users */
  users: number[];
}


/** Vote */
export interface Vote {
  /** Idea Id */
  idea_id: number;
}

/** ResourceDisplay */

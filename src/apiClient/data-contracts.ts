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

/** Body_change_password_v1_user_password_put */
export interface BodyChangePasswordV1UserPasswordPut {
  /**
   * Old Password
   * @default ""
   */
  old_password?: string;
  /** New Password */
  new_password: string;
}

/** Body_login_v1_auth_login_post */
export interface BodyLoginV1AuthLoginPost {
  /** Grant Type */
  grant_type?: string | null;
  /** Username */
  username: string;
  /** Password */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string | null;
  /** Client Secret */
  client_secret?: string | null;
}

/** Body_name_v1_user_name_put */
export interface BodyNameV1UserNamePut {
  /** Name */
  name: string;
}

/** Body_token_v1_auth_token_post */
export interface BodyTokenV1AuthTokenPost {
  /**
   * Grant Type
   * @pattern authorization_code
   */
  grant_type: string;
  /** Client Id */
  client_id?: string | null;
  /** Client Secret */
  client_secret?: string | null;
  /** Code */
  code: string;
  /** Redirect Uri */
  redirect_uri: string;
}

/** CombinedIdeaResponse */
export interface CombinedIdeaResponse {
  /** Combined Idea Id */
  combined_idea_id: number;
  /** Source Idea Id */
  source_idea_id: number;
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

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** Idea */
export interface Idea {
  /** Idea */
  idea: string;
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

/** IdeasList */
export interface IdeasList {
  /** Ideas */
  ideas: string[];
}

/** PendingInvitationInfo */
export interface PendingInvitationInfo {
  /** Project Id */
  project_id: number;
  /** Project Title */
  project_title: string;
  /** Project Description */
  project_description: string;
  /** Creator Name */
  creator_name: string;
  /**
   * Creator Email
   * @format email
   */
  creator_email: string;
  /**
   * Invitation Time
   * @format date-time
   */
  invitation_time: string;
  /** Creator Image */
  creator_image: string;
}

/** ProjectCreate */
export interface ProjectCreate {
  /** Title */
  title: string;
  /** Description */
  description?: string | null;
  /** Status */
  status: string;
  /** Resource Id */
  resource_id: number;
}

/** ProjectDisplay */
export interface ProjectDisplay {
  /** Project Id */
  project_id: number;
  /** Title */
  title: string;
  /** Description */
  description?: string | null;
  /** Status */
  status: string;
  /**
   * Creation Date
   * @format date-time
   */
  creation_date: string;
  /** Owner Id */
  owner_id: number;
  resource?: AppSchemeProjectSchemeResourceDisplay | null;
  /**
   * Participants
   * @default []
   */
  participants?: ProjectUserDisplay[];
}

/** ProjectInvitationCreate */
export interface ProjectInvitationCreate {
  /**
   * Email
   * @format email
   */
  email: string;
}

/** ProjectInvitationResponse */
export interface ProjectInvitationResponse {
  /** Message */
  message: string;
}

/** ProjectUpdate */
export interface ProjectUpdate {
  /** Title */
  title?: string | null;
  /** Description */
  description?: string | null;
  /** Status */
  status?: string | null;
}

/** ProjectUserDisplay */
export interface ProjectUserDisplay {
  user: UserBase;
  /** Role */
  role: string;
  /** Invitation Status */
  invitation_status: string;
}

/** ResourceCreate */
export interface ResourceCreate {
  /** Name */
  name: string;
  /** Type */
  type: string;
  /** Level */
  level?: string | null;
  /** Description */
  description?: string | null;
}

/** SessionExport */
export interface SessionExport {
  metadata: SessionResponse;
  /** Ideas */
  ideas: IdeaResponse[];
  /** Comments */
  comments: CommentResponse[];
  /** Combined Ideas */
  combined_ideas: CombinedIdeaResponse[];
  /** Final Decisions */
  final_decisions: FinalDecisionResponse[];
}

/** SessionResponse */
export interface SessionResponse {
  /** Title */
  title: string;
  /** Description */
  description?: string | null;
  /**
   * Ideation Technique
   * @pattern brain_writing|brain_storming
   */
  ideation_technique: string;
  /** Objectives */
  objectives?: string | null;
  /** Round Time */
  round_time: number;
  /**
   * Nb Rounds
   * @default 1
   */
  nb_rounds?: number;
  /** Session Id */
  session_id: number;
  /**
   * Session Status
   * @pattern open|started|closed
   */
  session_status: string;
  /**
   * Start Time
   * @format date-time
   */
  start_time: string;
  /** Project Id */
  project_id: number;
}

/** SessionSchema */
export interface SessionSchema {
  /** Session Id */
  session_id: number;
  /** Project Id */
  project_id: number;
  /** Title */
  title: string;
  /** Description */
  description: string | null;
  /** Ideation Technique */
  ideation_technique: string;
  /**
   * Start Time
   * @format date-time
   */
  start_time: string;
  /** Session Status */
  session_status: string;
  /** Objectives */
  objectives: string | null;
  /** Round Time */
  round_time: number;
  /** Nb Rounds */
  nb_rounds: number;
}

/** Token */
export interface Token {
  /** Access Token */
  access_token: string;
  /** Refresh Token */
  refresh_token: string;
  /** Token Type */
  token_type: string;
}

/** Topic */
export interface Topic {
  /** Topic */
  topic: string;
}

/** UpdateInvitation */
export interface UpdateInvitation {
  /** Status */
  status: boolean;
}

/** UserBase */
export interface UserBase {
  /** User Id */
  user_id: number;
  /** Name */
  name: string;
  /** Email */
  email: string;
  /** Image */
  image?: string | null;
}

/** UserResponse */
export interface UserResponse {
  /** Email */
  email: string;
  /** Id */
  id: number;
  /** Name */
  name: string;
  /**
   * Pfp
   * @format uri
   * @minLength 1
   */
  pfp: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** ResourceDisplay */
export interface AppSchemeProjectSchemeResourceDisplay {
  /** Resource Id */
  resource_id: number;
  /** Name */
  name: string;
  /** Type */
  type: string;
  /** Level */
  level?: string | null;
  /** Description */
  description?: string | null;
  /** Photo */
  photo?: string | null;
}

/** ResourceDisplay */
export interface AppSchemeRessourceSchemeResourceDisplay {
  /** Resource Id */
  resource_id: number;
  /** Name */
  name: string;
  /** Type */
  type: string;
  /** Level */
  level?: string | null;
  /** Description */
  description?: string | null;
}

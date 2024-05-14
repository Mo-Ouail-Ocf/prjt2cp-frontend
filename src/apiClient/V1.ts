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

import {
  AppSchemeRessourceSchemeResourceDisplay,
  BodyChangePasswordV1UserPasswordPut,
  BodyLoginV1AuthLoginPost,
  BodyNameV1UserNamePut,
  BodyTokenV1AuthTokenPost,
  FinalDecisionResponse,
  HTTPValidationError,
  Idea,
  IdeasList,
  PendingInvitationInfo,
  ProjectCreate,
  ProjectDisplay,
  ProjectInvitationCreate,
  ProjectInvitationResponse,
  ProjectUpdate,
  ResourceCreate,
  SessionCreate,
  SessionExport,
  SessionResponse,
  SessionSchema,
  Token,
  Topic,
  UpdateInvitation,
  UserResponse,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V1<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags AUTH
   * @name TokenV1AuthTokenPost
   * @summary Token
   * @request POST:/v1/auth/token
   */
  tokenV1AuthTokenPost = (data: BodyTokenV1AuthTokenPost, params: RequestParams = {}) =>
    this.request<Token, void | HTTPValidationError>({
      path: `/v1/auth/token`,
      method: "POST",
      body: data,
      type: ContentType.UrlEncoded,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AUTH
   * @name RefreshV1AuthRefreshPost
   * @summary Refresh
   * @request POST:/v1/auth/refresh
   * @secure
   */
  refreshV1AuthRefreshPost = (params: RequestParams = {}) =>
    this.request<Token, void>({
      path: `/v1/auth/refresh`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AUTH
   * @name LoginV1AuthLoginPost
   * @summary Login
   * @request POST:/v1/auth/login
   */
  loginV1AuthLoginPost = (data: BodyLoginV1AuthLoginPost, params: RequestParams = {}) =>
    this.request<Token, void | HTTPValidationError>({
      path: `/v1/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.UrlEncoded,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags USER
   * @name CurrentV1UserCurrentGet
   * @summary Current
   * @request GET:/v1/user/current
   * @secure
   */
  currentV1UserCurrentGet = (params: RequestParams = {}) =>
    this.request<UserResponse, void>({
      path: `/v1/user/current`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags USER
   * @name NameV1UserNamePut
   * @summary Name
   * @request PUT:/v1/user/name
   * @secure
   */
  nameV1UserNamePut = (data: BodyNameV1UserNamePut, params: RequestParams = {}) =>
    this.request<UserResponse, void | HTTPValidationError>({
      path: `/v1/user/name`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.UrlEncoded,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags USER
   * @name ChangePasswordV1UserPasswordPut
   * @summary Change Password
   * @request PUT:/v1/user/password
   * @secure
   */
  changePasswordV1UserPasswordPut = (data: BodyChangePasswordV1UserPasswordPut, params: RequestParams = {}) =>
    this.request<UserResponse, void | HTTPValidationError>({
      path: `/v1/user/password`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.UrlEncoded,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags USER
   * @name GetUserByIdV1UserUserIdGet
   * @summary Get User By Id
   * @request GET:/v1/user/{user_id}
   */
  getUserByIdV1UserUserIdGet = (userId: number, params: RequestParams = {}) =>
    this.request<UserResponse, void | HTTPValidationError>({
      path: `/v1/user/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags PROJECT
   * @name GetDetailsV1ProjectProjectIdGet
   * @summary Get Details
   * @request GET:/v1/project/{project_id}/
   * @secure
   */
  getDetailsV1ProjectProjectIdGet = (projectId: number, params: RequestParams = {}) =>
    this.request<ProjectDisplay, void | HTTPValidationError>({
      path: `/v1/project/${projectId}/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags PROJECT
   * @name CreateProjectV1ProjectPost
   * @summary Create Project
   * @request POST:/v1/project/
   * @secure
   */
  createProjectV1ProjectPost = (data: ProjectCreate, params: RequestParams = {}) =>
    this.request<ProjectDisplay, void | HTTPValidationError>({
      path: `/v1/project/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags PROJECT
   * @name ReadOwnedProjectsV1ProjectUserOwnedGet
   * @summary Read Owned Projects
   * @request GET:/v1/project/user/owned
   * @secure
   */
  readOwnedProjectsV1ProjectUserOwnedGet = (params: RequestParams = {}) =>
    this.request<ProjectDisplay[], void>({
      path: `/v1/project/user/owned`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags PROJECT
   * @name ReadParticipatedProjectsV1ProjectUserParticipatedGet
   * @summary Read Participated Projects
   * @request GET:/v1/project/user/participated
   * @secure
   */
  readParticipatedProjectsV1ProjectUserParticipatedGet = (params: RequestParams = {}) =>
    this.request<ProjectDisplay[], void>({
      path: `/v1/project/user/participated`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags PROJECT
   * @name UpdateProjectV1ProjectProjectIdPut
   * @summary Update Project
   * @request PUT:/v1/project/{project_id}
   * @secure
   */
  updateProjectV1ProjectProjectIdPut = (projectId: number, data: ProjectUpdate, params: RequestParams = {}) =>
    this.request<ProjectDisplay, void | HTTPValidationError>({
      path: `/v1/project/${projectId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags PROJECT
   * @name DeleteProjectV1ProjectProjectIdDelete
   * @summary Delete Project
   * @request DELETE:/v1/project/{project_id}
   * @secure
   */
  deleteProjectV1ProjectProjectIdDelete = (projectId: number, params: RequestParams = {}) =>
    this.request<void, void | HTTPValidationError>({
      path: `/v1/project/${projectId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags PROJECT
   * @name ReadPendingInvitationsV1ProjectUserPendingInvitationsGet
   * @summary Read Pending Invitations
   * @request GET:/v1/project/user/pending-invitations
   * @secure
   */
  readPendingInvitationsV1ProjectUserPendingInvitationsGet = (params: RequestParams = {}) =>
    this.request<PendingInvitationInfo[], void>({
      path: `/v1/project/user/pending-invitations`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags PROJECT
   * @name InviteV1ProjectProjectIdInvitePut
   * @summary Invite
   * @request PUT:/v1/project/{project_id}/invite
   * @secure
   */
  inviteV1ProjectProjectIdInvitePut = (projectId: number, data: ProjectInvitationCreate, params: RequestParams = {}) =>
    this.request<ProjectInvitationResponse, void | HTTPValidationError>({
      path: `/v1/project/${projectId}/invite`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags PROJECT
   * @name HandleInvitationV1ProjectProjectIdInvitePost
   * @summary Handle Invitation
   * @request POST:/v1/project/{project_id}/invite
   * @secure
   */
  handleInvitationV1ProjectProjectIdInvitePost = (
    projectId: number,
    data: UpdateInvitation,
    params: RequestParams = {},
  ) =>
    this.request<ProjectInvitationResponse, void | HTTPValidationError>({
      path: `/v1/project/${projectId}/invite`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags PROJECT
   * @name GetSessionsForProjectV1ProjectProjectIdSessionsGet
   * @summary Get Sessions For Project
   * @request GET:/v1/project/{project_id}/sessions
   * @secure
   */
  getSessionsForProjectV1ProjectProjectIdSessionsGet = (projectId: number, params: RequestParams = {}) =>
    this.request<SessionSchema[], void | HTTPValidationError>({
      path: `/v1/project/${projectId}/sessions`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RESSOURCE
   * @name ReadResourcesV1RessourceGet
   * @summary Read Resources
   * @request GET:/v1/ressource/
   * @secure
   */
  readResourcesV1RessourceGet = (params: RequestParams = {}) =>
    this.request<AppSchemeRessourceSchemeResourceDisplay[], void>({
      path: `/v1/ressource/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RESSOURCE
   * @name CreateV1RessourcePost
   * @summary Create
   * @request POST:/v1/ressource/
   * @secure
   */
  createV1RessourcePost = (data: ResourceCreate, params: RequestParams = {}) =>
    this.request<AppSchemeRessourceSchemeResourceDisplay, void | HTTPValidationError>({
      path: `/v1/ressource/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SESSION
   * @name GetSessionByIdV1SessionSessionIdGet
   * @summary Get Session By Id
   * @request GET:/v1/session/{session_id}
   * @secure
   */
  getSessionByIdV1SessionSessionIdGet = (sessionId: number, params: RequestParams = {}) =>
    this.request<SessionResponse, void | HTTPValidationError>({
      path: `/v1/session/${sessionId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SESSION
   * @name UpdateASessionV1SessionSessionIdPut
   * @summary Update A Session
   * @request PUT:/v1/session/{session_id}
   * @secure
   */
  updateASessionV1SessionSessionIdPut = (
    sessionId: number,
    query?: {
      /** Title */
      title?: string | null;
      /** Description */
      description?: string | null;
      /** Objectives */
      objectives?: string | null;
    },
    params: RequestParams = {},
  ) =>
    this.request<SessionResponse, void | HTTPValidationError>({
      path: `/v1/session/${sessionId}`,
      method: "PUT",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SESSION
   * @name CreateASessionV1SessionProjectProjectIdPost
   * @summary Create A Session
   * @request POST:/v1/session/project/{project_id}
   * @secure
   */
  createASessionV1SessionProjectProjectIdPost = (
    projectId: number,
    query: {
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
      /**
       * Is From Final Decision
       * @default false
       */
      is_from_final_decision?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SessionResponse, void | HTTPValidationError>({
      path: `/v1/session/project/${projectId}`,
      method: "POST",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SESSION
   * @name GetOpenSessionsForAProjectV1SessionProjectProjectIdGet
   * @summary Get Open Sessions For A Project
   * @request GET:/v1/session/project/{project_id}
   * @secure
   */
  getOpenSessionsForAProjectV1SessionProjectProjectIdGet = (projectId: number, params: RequestParams = {}) =>
    this.request<SessionResponse[], void | HTTPValidationError>({
      path: `/v1/session/project/${projectId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SESSION
   * @name CreateSessionFromFinalDecisionV1SessionFromDecisionProjectIdDecisionIdPost
   * @summary Create Session From Final Decision
   * @request POST:/v1/session/from_decision/{project_id}/{decision_id}
   * @secure
   */
  createSessionFromFinalDecisionV1SessionFromDecisionProjectIdDecisionIdPost = (
    decisionId: number,
    projectId: number,
    data: SessionCreate,
    params: RequestParams = {},
  ) =>
    this.request<SessionResponse, void | HTTPValidationError>({
      path: `/v1/session/from_decision/${projectId}/${decisionId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SESSION
   * @name GetClosedSessionsForAProjectV1SessionProjectProjectIdClosedGet
   * @summary Get Closed Sessions For A Project
   * @request GET:/v1/session/project/{project_id}/closed
   * @secure
   */
  getClosedSessionsForAProjectV1SessionProjectProjectIdClosedGet = (projectId: number, params: RequestParams = {}) =>
    this.request<SessionResponse[], void | HTTPValidationError>({
      path: `/v1/session/project/${projectId}/closed`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SESSION
   * @name SessionAsJsonV1SessionExportSessionIdGet
   * @summary Session As Json
   * @request GET:/v1/session/export/{session_id}/
   * @secure
   */
  sessionAsJsonV1SessionExportSessionIdGet = (sessionId: number, params: RequestParams = {}) =>
    this.request<SessionExport, void | HTTPValidationError>({
      path: `/v1/session/export/${sessionId}/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SESSION
   * @name DownloadSessionAsJsonV1SessionDownloadSessionIdGet
   * @summary Download Session As Json
   * @request GET:/v1/session/download/{session_id}
   * @secure
   */
  downloadSessionAsJsonV1SessionDownloadSessionIdGet = (sessionId: number, params: RequestParams = {}) =>
    this.request<any, void | HTTPValidationError>({
      path: `/v1/session/download/${sessionId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SESSION
   * @name UploadSessionToDriveV1SessionDriveSessionIdPost
   * @summary Upload Session To Drive
   * @request POST:/v1/session/drive/{session_id}
   * @secure
   */
  uploadSessionToDriveV1SessionDriveSessionIdPost = (
    sessionId: number,
    query?: {
      /**
       * File Name
       * @default ""
       */
      file_name?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<any, void | HTTPValidationError>({
      path: `/v1/session/drive/${sessionId}`,
      method: "POST",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags BOT
   * @name GenerateIdeasV1BotGenerateIdeasPost
   * @summary Generate Ideas
   * @request POST:/v1/bot/generate_ideas/
   * @secure
   */
  generateIdeasV1BotGenerateIdeasPost = (data: Topic, params: RequestParams = {}) =>
    this.request<any, void | HTTPValidationError>({
      path: `/v1/bot/generate_ideas/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags BOT
   * @name CombineIdeasV1BotCombineIdeasPost
   * @summary Combine Ideas
   * @request POST:/v1/bot/combine_ideas/
   * @secure
   */
  combineIdeasV1BotCombineIdeasPost = (data: IdeasList, params: RequestParams = {}) =>
    this.request<any, void | HTTPValidationError>({
      path: `/v1/bot/combine_ideas/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags BOT
   * @name RefineIdeaV1BotRefineIdeaPost
   * @summary Refine Idea
   * @request POST:/v1/bot/refine_idea/
   * @secure
   */
  refineIdeaV1BotRefineIdeaPost = (data: Idea, params: RequestParams = {}) =>
    this.request<any, void | HTTPValidationError>({
      path: `/v1/bot/refine_idea/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags FINAL DECISIONS
   * @name GetFinalDecisionsOfSessionV1FinalDecisionsSessionSessionIdGet
   * @summary Get Final Decisions Of Session
   * @request GET:/v1/final_decisions/session/{session_id}
   * @secure
   */
  getFinalDecisionsOfSessionV1FinalDecisionsSessionSessionIdGet = (sessionId: number, params: RequestParams = {}) =>
    this.request<FinalDecisionResponse[], HTTPValidationError>({
      path: `/v1/final_decisions/session/${sessionId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}

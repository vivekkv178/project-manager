export const FE_ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  HOME: "/home",
};

export const BE_ROUTES = {
  GET_PROJECTS: "/getProjects",
  GET_WORKFLOWS: "/getWorkflows",
  TRIGGER_WORKFLOW: "/triggerWorkflow",
};

export enum ROLES {
  ADMIN = "ADMIN",
  ORG_USER = "ORG_USER",
  USER = "USER",
}

export const RBAC = {
  [ROLES.USER]: [ROLES.USER, ROLES.ORG_USER, ROLES.ADMIN],
  [ROLES.ORG_USER]: [ROLES.ORG_USER, ROLES.ADMIN],
  [ROLES.ADMIN]: [ROLES.ADMIN],
};

export type Route = {
  icon: string;
  path: string;
  title: string;
  role: ROLES;
  customClick?: boolean;
  badge?: number;
};

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
}

export const FIREBASE_CONSTANTS = {
  PORTFOLIO_COLLECTION_NAME: "portfolio_data",
  PORTFOLIO_COLELCTION_DOCUMENT_ID: "portfolio_data",
};

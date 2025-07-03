// auth - signup
export const userSignupEndpoint = "/v1/auth/signup";

// auth - signin
export const userSigninEndpoint = "/v1/auth/signin";

// auth - me
export const userSelfDetailsEndpoint = "/v1/auth/me";

// projects
export const createProjectEndpoint = "/v1/projects";
export const getProjectsEndpoint = "/v1/projects";
export const updateProjectEndpoint = (projectId) => `/v1/projects/${projectId}`;
export const deleteProjectEndpoint = (projectId) => `/v1/projects/${projectId}`;
export const getProjectWithDataEndpoint = (projectId) =>
  `/v1/projects/${projectId}/data`;

// tags
export const createTagEndpoint = "/v1/tags";
export const getTagsEndpoint = "/v1/tags";
export const updateTagEndpoint = (tagId) => `/v1/tags/${tagId}`;
export const deleteTagEndpoint = (tagId) => `/v1/tags/${tagId}`;
export const getTagWithDataEndpoint = (tagId) => `/v1/tags/${tagId}/data`;

// tasks
export const createTaskEndpoint = `/v1/tasks`;

//user-settings
export const getUserSettingsEndpoint = "/v1/user/settings";

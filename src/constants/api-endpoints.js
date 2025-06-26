// auth - signup
export const userSignupEndpoint = "/v1/auth/signup";

// auth - signin
export const userSigninEndpoint = "/v1/auth/signin";

// projects

export const getProjectsEndpoint = "/v1/projects";
export const updateProjectEndpoint = (projectId) => `/v1/projects/${projectId}`;

// tags
export const createTagEndpoint = "/v1/tags";
export const getTagsEndpoint = "/v1/tags";
export const updateTagEndpoint = (tagId) => `/v1/tags/${tagId}`;

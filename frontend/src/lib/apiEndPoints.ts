import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const API_URL = BASE_URL + "/api/v1/user";
export const LOGIN_URL = API_URL + "/login";

// for group
export const API_GROUP_URL = BASE_URL + "/api/v1/group";
export const GROUP_CHAT_URL = API_GROUP_URL + "/group-chat";

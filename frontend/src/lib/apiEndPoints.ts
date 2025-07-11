import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const API_URL = BASE_URL + "/api/v1/user";
export const LOGIN_URL = API_URL + "/login";

// for group
export const API_GROUP_URL = BASE_URL + "/api/v1/group";
export const GROUP_CHAT_URL = API_GROUP_URL + "/group-chat";
export const GROUPS_CHAT_URL = API_GROUP_URL + "/all-group";
export const CHAT_GROUP_USERS = API_GROUP_URL + "/chat-group-users";
export const CHATS_URL = API_GROUP_URL + "/chats";

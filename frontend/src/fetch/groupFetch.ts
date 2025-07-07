import {
  GROUP_CHAT_URL,
  GROUPS_CHAT_URL,
  CHAT_GROUP_USERS
} from "@/lib/apiEndPoints";
import axios from "axios";

export async function fetchChatGroups(token: string) {
  //   console.log("Token:", token);
  try {
    const res = await axios.get(GROUPS_CHAT_URL, {
      headers: {
        Authorization: token
      }
    });

    if (res.data?.data) {
      return res.data.data;
    }
    return [];
  } catch (err) {
    console.error("fetchChatGroups error:", err);
    throw new Error("Failed to fetch data");
  }
}

export async function fetchChatGroup(id: string) {
  try {
    const res = await axios.get(`${GROUP_CHAT_URL}/${id}`);
    if (res.data?.data) {
      return res.data.data;
    }
    return null;
  } catch {
    throw new Error("Failed to fetch data");
  }
}

export async function fetchChatGroupUsers(id: string) {
  const res = await fetch(`${CHAT_GROUP_USERS}?group_id=${id}`, {
    cache: "no-cache"
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}

// import ChatBase from "@/components/chat/ChatBase";
// import React from "react";

// const page = async () => {
//   // console.log("Group ID:", params.id); ❌ optional: remove this
//   return (
//     <div>
//       <h1>hello</h1>
//       <ChatBase />
//     </div>
//   );
// };

// export default page;

import ChatBase from "@/components/chat/ChatBase";
// import { fetchChatGroup } from "@/fetch/groupFetch";

import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";
import React from "react";

export default async function chat(props: { params: { id: string } }) {
  const { params } = props;
  if (params.id.length !== 36) {
    return notFound();
  }
  const chatGroup: GroupChatType | null = await fetchChatGroup(params.id);
  if (chatGroup === null) {
    return notFound();
  }
  const chatGroupUsers: Array<GroupChatUserType> | [] =
    await fetchChatGroupUsers(params.id);
  // const chats: Array<MessageType> | [] = await fetchChats(params.id);

  return (
    <div>
      <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={[]} />
    </div>
  );
}

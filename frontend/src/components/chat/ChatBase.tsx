// "use client";
// import { getSocket } from "@/lib/socket.config";
// import React, { useEffect, useMemo } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { Button } from "../ui/button";

// type MessageData = {
//   name: string;
//   id: string;
//   // add more fields if needed
// };

// export default function ChatBase() {
//   const socket = useMemo(() => getSocket(), []);

//   useEffect(() => {
//     socket.connect();

//     socket.on("message", (data: MessageData) => {
//       console.log("📩 The Socket message is", data);
//     });

//     return () => {
//       socket.disconnect(); // better than close()
//     };
//   }, [socket]);

//   const handleClick = () => {
//     // console.log("clicking.." + uuidv4());
//     socket.emit("message", { name: "ram", id: uuidv4() });
//     console.log("clickiing..." + uuidv4());
//   };

//   return (
//     <div>
//       <Button onClick={handleClick}>Send Message</Button>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatIUserDialog";
import ChatSidebar from "./ChatSidebar";
import Chats from "./Chats";

export default function ChatBase({
  group,
  users,
  oldMessages
}: {
  group: GroupChatType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();
  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, [group.id]);
  return (
    <div className="flex">
      <ChatSidebar users={users} />
      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} user={chatUser} />
        )}

        {/* Messages */}
        <Chats oldMessages={oldMessages} group={group} chatUser={chatUser} />
      </div>
    </div>
  );
}

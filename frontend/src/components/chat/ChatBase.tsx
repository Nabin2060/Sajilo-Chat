"use client";
import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";

type MessageData = {
  name: string;
  id: string;
  // add more fields if needed
};

export default function ChatBase() {
  const socket = useMemo(() => getSocket(), []);

  useEffect(() => {
    socket.connect();

    socket.on("message", (data: MessageData) => {
      console.log("📩 The Socket message is", data);
    });

    return () => {
      socket.disconnect(); // better than close()
    };
  }, [socket]);

  const handleClick = () => {
    // console.log("clicking.." + uuidv4());
    socket.emit("message", { name: "ram", id: uuidv4() });
    console.log("clickiing..." + uuidv4());
  };

  return (
    <div>
      <Button onClick={handleClick}>Send Message</Button>
    </div>
  );
}

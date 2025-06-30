// "use client";
import DashNav from "@/dashboard/DashNav";
import React from "react";
import { authOption, CustomSession } from "../api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

const page = async () => {
  const session: CustomSession | null = await getServerSession(authOption);
  return (
    <div>
      <DashNav
        name={session?.user?.name as string}
        image={session?.user?.image ?? undefined}
      />
    </div>
  );
};

export default page;

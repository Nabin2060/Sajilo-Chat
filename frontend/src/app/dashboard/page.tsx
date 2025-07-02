// "use client";
import DashNav from "@/dashboard/DashNav";
import CreateChat from "@/components/groupChat/CreateChat";
import React from "react";
import { authOption, CustomSession } from "../api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

const page = async () => {
  const session: CustomSession | null = await getServerSession(authOption);
  if (!session?.user) return null;

  return (
    <div>
      {/* <p>{JSON.stringify(session)}</p> */}
      <DashNav
        name={session?.user?.name as string}
        image={session?.user?.image ?? undefined}
      />
      <div className="container">
        <div className="mt-6 text-end">
          <CreateChat user={session.user} />
        </div>
      </div>
    </div>
  );
};

export default page;

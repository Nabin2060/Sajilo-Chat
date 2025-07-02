// // "use client";
// import DashNav from "@/dashboard/DashNav";
// import CreateChat from "@/components/groupChat/CreateChat";
// import React from "react";
// import { authOption, CustomSession } from "../api/auth/[...nextauth]/option";
// import { getServerSession } from "next-auth";

// const page = async () => {
//   const session: CustomSession | null = await getServerSession(authOption);
//   if (!session?.user) return null;

//   return (
//     <div>
//       {/* <p>{JSON.stringify(session)}</p> */}
//       <DashNav
//         name={session?.user?.name as string}
//         image={session?.user?.image ?? undefined}
//       />
//       <div className="container">
//         <div className="mt-6 text-end">
//           <CreateChat user={session.user} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

import CreateChat from "@/components/groupChat/CreateChat";
import DashNav from "@/components/groupChat/DashNav";
import React from "react";
import { authOption, CustomSession } from "../api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { fetchChatGroups } from "@/fetch/groupFetch";
import GroupChatCard from "@/components/groupChat/GroupChatCard";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOption);
  if (!session?.user) return null;
  const groups: Array<GroupChatType> | [] = await fetchChatGroups(
    session.user.token ?? ""
  );

  return (
    <div>
      <DashNav
        name={session?.user?.name as string}
        image={session?.user?.image ?? undefined}
      />
      <div className="container">
        <div className="mt-6 text-end">
          <CreateChat user={session.user} />
        </div>

        {/* If Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session.user!} />
            ))}
        </div>
      </div>
    </div>
  );
}

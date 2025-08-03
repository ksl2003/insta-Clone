/* eslint-disable @typescript-eslint/no-unused-vars */
// import { getSessionEmailOrThrow } from "@/actions";
// import { prisma } from "@/db";
import { Follower, Profile } from "@prisma/client";
// import { Avatar } from "@radix-ui/themes";
// import { PlusIcon } from "lucide-react";

export default async function HomeTopRow({
  follows,
  profiles,
}: {
  follows: Follower[];
  profiles: Profile[];
}) {
  return (
    <div className="mb-8">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {/* User Stories Removed */}
      </div>
    </div>
  );
}

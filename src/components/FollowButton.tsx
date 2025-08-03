"use client";
import { followProfile, unfollowProfile } from "@/actions";
import { Follower } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from "@radix-ui/themes";
import { UserMinusIcon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowButton({
  profileIdToFollow,
  ourFollow = null,
}: {
  profileIdToFollow: string;
  ourFollow: Follower | null;
}) {
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow);

  return (
    <form
      action={async () => {
        setIsFollowed((prev) => !prev);
        if (isFollowed) {
          await unfollowProfile(profileIdToFollow);
        } else {
          await followProfile(profileIdToFollow);
        }
        router.refresh();
      }}
    >
      <button
        className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 hover-lift-sm ${
          isFollowed
            ? "bg-muted text-foreground hover:bg-muted/80 border border-border"
            : "ig-gradient text-white hover:shadow-lg transform hover:scale-105"
        }`}
      >
        {isFollowed ? (
          <>
            <UserMinusIcon className="w-4 h-4" />
            <span>Following</span>
          </>
        ) : (
          <>
            <UserPlusIcon className="w-4 h-4" />
            <span>Follow</span>
          </>
        )}
      </button>
    </form>
  );
}

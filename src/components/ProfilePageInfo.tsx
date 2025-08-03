import FollowButton from "@/components/FollowButton";
import ProfileBackButton from "@/components/ProfileBackButton";
import { Follower, Profile } from "@prisma/client";
import { CheckIcon, CogIcon } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/db";

export default async function ProfilePageInfo({
  profile,
  isOurProfile,
  ourFollow,
}: {
  profile: Profile;
  isOurProfile: boolean;
  ourFollow: Follower | null;
}) {
  // Get actual counts
  const followersCount = await prisma.follower.count({
    where: { followedProfileId: profile.id },
  });

  const followingCount = await prisma.follower.count({
    where: { followingProfileEmail: profile.email },
  });

  const postsCount = await prisma.post.count({
    where: { author: profile.email },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex items-center justify-between">
        <ProfileBackButton />
        <div className="flex items-center space-x-2">
          <h1 className="ig-heading text-lg font-semibold">
            {profile.username}
          </h1>
          <div className="w-5 h-5 ig-gradient rounded-full flex items-center justify-center">
            <CheckIcon className="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          {isOurProfile && (
            <Link href="/settings" className="p-2 rounded-full">
              <CogIcon className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

      {/* Profile Info */}
      <section className="flex flex-col md:flex-row md:items-center md:space-x-8">
        {/* Avatar */}
        <div className="flex justify-center md:justify-start mb-6 md:mb-0">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 p-1 ig-gradient rounded-full">
              <div className="w-full h-full bg-background rounded-full p-1">
                <div className="w-full h-full aspect-square overflow-hidden rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src={profile.avatar || ""}
                    alt={profile.name || "Profile"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            {!isOurProfile && (
              <FollowButton
                ourFollow={ourFollow}
                profileIdToFollow={profile.id}
              />
            )}
          </div>

          <div className="flex space-x-8 text-sm">
            <div className="text-center">
              <div className="font-semibold">{postsCount}</div>
              <div className="text-muted-foreground">posts</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{followersCount}</div>
              <div className="text-muted-foreground">followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{followingCount}</div>
              <div className="text-muted-foreground">following</div>
            </div>
          </div>

          <div className="space-y-2">
            {profile.subtitle && (
              <p className="font-semibold">{profile.subtitle}</p>
            )}
            {profile.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

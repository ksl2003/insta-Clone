import {getSessionEmailOrThrow} from "@/actions";
import {prisma} from "@/db";
import {Follower, Profile} from "@prisma/client";
import {Avatar} from "@radix-ui/themes";
import {PlusIcon} from "lucide-react";

export default async function HomeTopRow({
  follows,
  profiles,
}:{
  follows:Follower[],
  profiles:Profile[],
}) {
  return (
    <div className="mb-8">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {/* New Story Button */}
        <div className="flex flex-col items-center space-y-2 min-w-[80px]">
          <button className="w-16 h-16 ig-gradient rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 hover-lift">
            <PlusIcon className="w-6 h-6 text-white" />
          </button>
          <p className="text-xs text-muted-foreground font-medium">New Story</p>
        </div>
        
        {/* User Stories */}
        {profiles.map(profile => (
          <div key={profile.id} className="flex flex-col items-center space-y-2 min-w-[80px]">
            <div className="relative hover-lift">
              <div className="w-16 h-16 p-0.5 ig-gradient rounded-full">
                <div className="w-full h-full bg-background rounded-full p-0.5">
                  <Avatar
                    size="6"
                    radius="full"
                    fallback={profile.name?.charAt(0) || 'U'}
                    src={profile.avatar || ''}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium truncate w-full text-center">
              {profile.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
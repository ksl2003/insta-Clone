import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";
import { Avatar } from "@radix-ui/themes";
import { UserIcon, HashIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default async function SearchResults({ query }: { query: string }) {
  const profiles = await prisma.profile.findMany({
    where: {
      OR: [{ username: { contains: query } }, { name: { contains: query } }],
    },
    take: 10,
  });
  const posts = await prisma.post.findMany({
    where: {
      description: { contains: query },
    },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <HashIcon className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">
          Search results for &quot;{query}&quot;
        </h2>
      </div>

      {/* User Results */}
      {profiles?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium">People</h3>
          </div>
          <div className="grid gap-3">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                href={`/users/${profile.username}`}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors hover-lift-sm"
              >
                <Avatar
                  size="3"
                  radius="full"
                  fallback={profile.name?.charAt(0) || "U"}
                  src={profile.avatar || ""}
                />
                <div className="flex-1">
                  <h4 className="font-medium">{profile.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    @{profile.username}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Post Results */}
      {posts?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="font-medium">Posts</h3>
          </div>
          <PostsGrid posts={posts} />
        </div>
      )}

      {/* No Results */}
      {profiles?.length === 0 && posts?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 hover-lift">
            <SearchIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-2">No results found</h3>
          <p className="text-muted-foreground">
            Try searching with different keywords
          </p>
        </div>
      )}
    </div>
  );
}

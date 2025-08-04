/* eslint-disable @typescript-eslint/no-unused-vars */
import { getSessionEmailOrThrow } from "@/actions";
import BookmarkButton from "@/components/BookmarkButton";
import LikesInfo from "@/components/LikesInfo";
import { prisma } from "@/db";
import { Follower, Profile } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

export default async function HomePosts({
  follows,
  profiles,
}: {
  follows: Follower[];
  profiles: Profile[];
}) {
  // 1. Fetch base post data without the counts
  const postsData = await prisma.post.findMany({
    where: {
      author: { in: profiles.map((p) => p.email) },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
    select: {
      id: true,
      author: true,
      image: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // If there are no posts, we can stop here.
  if (postsData.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-10 text-muted-foreground">
        No posts to display.
      </div>
    );
  }

  const postIds = postsData.map((p) => p.id);

  // 2. Fetch like and comment counts efficiently using groupBy
  const likeCounts = await prisma.like.groupBy({
    by: ["postId"],
    where: { postId: { in: postIds } },
    _count: { _all: true },
  });

  const commentCounts = await prisma.comment.groupBy({
    by: ["postId"],
    where: { postId: { in: postIds } },
    _count: { _all: true },
  });

  // 3. Create maps for quick lookups
  const likeCountsMap = new Map(
    likeCounts.map((item) => [item.postId, item._count._all])
  );
  const commentCountsMap = new Map(
    commentCounts.map((item) => [item.postId, item._count._all])
  );

  // 4. Combine the data to match the structure your component expects
  const posts = postsData.map((post) => ({
    ...post,
    _count: {
      likes: likeCountsMap.get(post.id) || 0,
      comments: commentCountsMap.get(post.id) || 0,
    },
  }));

  // The rest of your data fetching remains the same
  const likes = await prisma.like.findMany({
    where: {
      author: await getSessionEmailOrThrow(),
      postId: { in: postIds },
    },
  });
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      author: await getSessionEmailOrThrow(),
      postId: { in: postIds },
    },
  });

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {posts.map((post) => {
        const profile = profiles.find((p) => p.email === post.author);
        return (
          <article key={post.id} className="card overflow-hidden hover-lift">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Avatar
                  radius="full"
                  src={profile?.avatar || ""}
                  size="2"
                  fallback={profile?.name?.charAt(0) || "U"}
                />
                <div>
                  <Link
                    className="font-semibold text-foreground hover:text-muted-foreground transition-colors"
                    href={`/users/${profile?.username}`}
                  >
                    {profile?.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {profile?.username}
                  </p>
                </div>
              </div>
              <button className="p-1 hover:bg-accent rounded-full transition-colors hover-lift-sm">
                <MoreHorizontalIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Post Image */}
            <Link href={`/posts/${post.id}`}>
              <div className="relative aspect-square overflow-hidden image-hover">
                <img
                  className="w-full h-full object-cover transition-transform duration-300"
                  src={post.image}
                  alt={post.description || "Post image"}
                />
              </div>
            </Link>

            {/* Post Actions */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <LikesInfo
                    post={post}
                    showText={false}
                    sessionLike={
                      likes.find((like) => like.postId === post.id) || null
                    }
                  />
                  <Link
                    href={`/posts/${post.id}`}
                    className="p-1 hover:bg-accent rounded-full transition-colors hover-lift-sm"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </Link>
                  <button className="p-1 hover:bg-accent rounded-full transition-colors hover-lift-sm">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </button>
                </div>
                <BookmarkButton
                  post={post}
                  sessionBookmark={
                    bookmarks.find((b) => b.postId === post.id) || null
                  }
                />
              </div>

              {/* Likes Count */}
              <div className="text-sm font-semibold">
                {post._count?.likes || 0} likes
              </div>

              {/* Post Description */}
              {post.description && (
                <div className="text-sm">
                  <Link
                    className="font-semibold text-foreground hover:text-muted-foreground transition-colors"
                    href={`/users/${profile?.username}`}
                  >
                    {profile?.username}
                  </Link>
                  <span className="ml-2">{post.description}</span>
                </div>
              )}

              {/* Comments Preview */}
              <Link href={`/posts/${post.id}`} className="text-sm text-muted-foreground hover:text-foreground">
                View all {post._count?.comments || 0} comments
              </Link>

              {/* Timestamp */}
              <div className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
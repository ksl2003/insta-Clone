"use client";
import { likePost, removeLikeFromPost } from "@/actions";
import { Like, Post } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LikesInfo({
  post,
  sessionLike,
  showText = true,
}: {
  post: Post;
  sessionLike: Like | null;
  showText?: boolean;
}) {
  const router = useRouter();
  const [likedByMe, setLikedByMe] = useState(!!sessionLike);

  return (
    <form
      action={async (data: FormData) => {
        setLikedByMe((prev) => !prev);
        if (likedByMe) {
          await removeLikeFromPost(data);
        } else {
          await likePost(data);
        }
        router.refresh();
      }}
      className="flex items-center space-x-2"
    >
      <input type="hidden" name="postId" value={post.id} />
      <button
        type="submit"
        className="p-1 hover:bg-accent rounded-full transition-colors hover-lift-sm"
      >
        <HeartIcon
          className={`w-6 h-6 transition-all duration-200 ${
            likedByMe
              ? "text-blue-500 fill-blue-500 scale-110"
              : "text-foreground hover:text-blue-500"
          }`}
        />
      </button>
      {showText && (
        <span className="text-sm text-muted-foreground">
          {post.likesCount || 0} likes
        </span>
      )}
    </form>
  );
}

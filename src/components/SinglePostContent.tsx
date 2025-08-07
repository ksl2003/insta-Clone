import BookmarkButton from "@/components/BookmarkButton";
import Comment from "@/components/Comment";
import LikesInfo from "@/components/LikesInfo";
import Preloader from "@/components/Preloader";
import SessionCommentForm from "@/components/SessionCommentForm";
import {
  Post,
  Profile,
  Comment as CommentModel,
  Like,
  Bookmark,
} from "@prisma/client";
import { Suspense } from "react";

export default function SinglePostContent({
  post,
  authorProfile,
  comments,
  commentsAuthors,
  myLike,
  myBookmark,
}: {
  post: Post;
  authorProfile: Profile;
  comments: CommentModel[];
  commentsAuthors: Profile[];
  myLike: Like | null;
  myBookmark: Bookmark | null;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Image Section */}
      <div className="lg:w-1/2 lg:border-r border-border">
        <div className="w-full overflow-hidden image-hover">
          <img
            className="w-full object-contain max-h-96 transition-transform duration-300 mx-auto"
            src={post.image}
            alt={post.description || "Post image"}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="lg:w-1/2 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted hover-lift">
              <img
                className="w-full h-full object-cover"
                src={authorProfile?.avatar || ""}
                alt={authorProfile?.name || "User"}
              />
            </div>
            <div>
              <h3 className="font-semibold">{authorProfile?.name}</h3>
              <p className="text-sm text-muted-foreground">
                @{authorProfile?.username}
              </p>
            </div>
          </div>

          {post.description && (
            <p className="text-sm leading-relaxed">{post.description}</p>
          )}
        </div>

        {/* Comments */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              createdAt={comment.createdAt}
              text={comment.text}
              authorProfile={commentsAuthors.find(
                (a) => a.email === comment.author
              )}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <LikesInfo post={post} sessionLike={myLike} showText={true} />
            <BookmarkButton post={post} sessionBookmark={myBookmark} />
          </div>

          {/* Comment Form */}
          <div className="border-t border-border pt-4">
            <Suspense fallback={<Preloader />}>
              <SessionCommentForm postId={post.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

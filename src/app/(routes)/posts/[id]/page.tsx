import { getSinglePostData } from "@/actions";
import SinglePostContent from "@/components/SinglePostContent";
import React from "react";

export default async function SinglePostPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getSinglePostData(params.id);
  if (!data) {
    return (
      <div className="text-center py-20 text-lg text-muted-foreground">
        Post not found.
      </div>
    );
  }
  const { post, authorProfile, comments, commentsAuthors, myLike, myBookmark } =
    data;
  return (
    <SinglePostContent
      post={post}
      authorProfile={authorProfile}
      comments={comments}
      commentsAuthors={commentsAuthors}
      myLike={myLike}
      myBookmark={myBookmark}
    />
  );
}

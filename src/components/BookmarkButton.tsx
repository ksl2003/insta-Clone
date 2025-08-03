'use client';
import {bookmarkPost, unbookmarkPost} from "@/actions";
import {Post} from "@prisma/client";
import {BookmarkIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function BookmarkButton({
  post,
  sessionBookmark,
}:{
  post:Post;
  sessionBookmark:any|null;
}) {
  const router = useRouter();
  const [bookmarkedByMe, setBookmarkedByMe] = useState(!!sessionBookmark);
  
  return (
    <form
      action={async (data:FormData) => {
        setBookmarkedByMe(prev => !prev);
        if (bookmarkedByMe) {
          await unbookmarkPost(post.id);
        } else {
          await bookmarkPost(post.id);
        }
        router.refresh();
      }}
      className="flex items-center"
    >
      <input type="hidden" name="postId" value={post.id}/>
      <button
        type="submit"
        className="p-1 hover:bg-accent rounded-full transition-colors hover-lift-sm"
      >
        <BookmarkIcon 
          className={`w-6 h-6 transition-all duration-200 ${
            bookmarkedByMe 
              ? 'text-blue-500 fill-blue-500 scale-110' 
              : 'text-foreground hover:text-blue-500'
          }`}
        />
      </button>
    </form>
  );
}
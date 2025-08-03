'use client';
import {postComment} from "@/actions";
import Avatar from "@/components/Avatar";
import {Button, TextArea} from "@radix-ui/themes";
import {SendIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useRef, useState} from "react";

export default function CommentForm({avatar, postId}:{avatar:string; postId:string}) {
  const router = useRouter();
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  return (
    <form action={async data => {
      setIsSubmitting(true);
      if (areaRef.current) {
        areaRef.current.value = '';
      }
      await postComment(data);
      setIsSubmitting(false);
      router.refresh();
    }}>
      <input type="hidden" name="postId" value={postId} />
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Avatar src={avatar} fallback="U"/>
        </div>
        <div className="flex-1 space-y-3">
          <TextArea
            ref={areaRef}
            name="text"
            placeholder="Add a comment..."
            className="min-h-20 resize-none"
            required
          />
          <div className="flex justify-end">
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Posting...</span>
                </div>
              ) : (
                <>
                  <SendIcon className="w-4 h-4 mr-2" />
                  Post Comment
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
import {auth} from "@/auth";
import PostsGrid from "@/components/PostsGrid";
import ProfileNav from "@/components/ProfileNav";
import ProfilePageInfo from "@/components/ProfilePageInfo";
import {prisma} from "@/db";
import {redirect} from "next/navigation";
import {BookmarkIcon} from "lucide-react";

export default async function BookmarkedPage() {
  const session = await auth();
  const profile = await prisma.profile
    .findFirst({where:{email:session?.user?.email as string}});
  if (!profile) {
    return redirect('/settings');
  }
  const bookmarks = await prisma.bookmark.findMany({
    where: {author:session?.user?.email as string},
  });
  const posts = await prisma.post.findMany({
    where: {id: {in: bookmarks.map(b => b.postId)}},
  })
  
  return (
    <div className="space-y-6">
      <ProfilePageInfo
        profile={profile}
        isOurProfile={true}
        ourFollow={null} />
      <ProfileNav
        username={profile.username || ''}
        isOurProfile={true} />
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <BookmarkIcon className="w-5 h-5 text-muted-foreground hover-lift" />
          <h2 className="text-lg font-semibold font-serif">Saved Posts</h2>
        </div>
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
}
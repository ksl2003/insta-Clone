import PostsGrid from "@/components/PostsGrid";
import {prisma} from "@/db";
import {CompassIcon} from "lucide-react";

export default async function BrowsePage() {
  const posts = await prisma.post.findMany({
    orderBy: {createdAt: 'desc'},
    take: 100,
  });
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <CompassIcon className="w-8 h-8 text-muted-foreground hover-lift" />
          <h1 className="text-2xl font-bold font-serif">Explore</h1>
        </div>
        <p className="text-muted-foreground">
          Discover amazing posts from around the world
        </p>
      </div>
      
      <PostsGrid posts={posts}/>
    </div>
  );
}
'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Grid3X3Icon, BookmarkIcon, StarIcon} from "lucide-react";

export default function ProfileNav({
  isOurProfile=false,
  username,
}:{
  isOurProfile:boolean
  username:string;
}) {
  const path = usePathname();
  const bookmarkedActive = path.includes('/bookmarked');
  const highlightsActive = path.includes('/highlights');
  const postsActive = !bookmarkedActive && !highlightsActive;
  
  return (
    <section className="border-t border-border">
      <div className="flex justify-center">
        <nav className="flex space-x-8">
          <Link
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors hover-lift-sm ${
              postsActive
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            href={isOurProfile ? '/profile' : `/${username}`}
          >
            <Grid3X3Icon className="w-4 h-4" />
            <span className="font-medium">Posts</span>
          </Link>
          
          <Link
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors hover-lift-sm ${
              highlightsActive
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            href={'/highlights'}
          >
            <StarIcon className="w-4 h-4" />
            <span className="font-medium">Highlights</span>
          </Link>
          
          {isOurProfile && (
            <Link
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors hover-lift-sm ${
                bookmarkedActive
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              href={'/profile/bookmarked'}
            >
              <BookmarkIcon className="w-4 h-4" />
              <span className="font-medium">Saved</span>
            </Link>
          )}
        </nav>
      </div>
    </section>
  );
}
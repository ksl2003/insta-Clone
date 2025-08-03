import {CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserIcon} from "lucide-react";
import Link from "next/link";

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-card/80 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around px-4 py-2">
          <Link 
            href="/" 
            className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 hover-lift-sm"
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          
          <Link 
            href="/search" 
            className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 hover-lift-sm"
          >
            <SearchIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Search</span>
          </Link>
          
          {/* Create Button - Centered with special styling */}
          <div className="relative -top-6">
            <Link 
              href="/create" 
              className="flex items-center justify-center w-14 h-14 ig-gradient rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 hover-lift"
            >
              <CameraIcon className="w-6 h-6 text-white" />
            </Link>
          </div>
          
          <Link 
            href="/browse" 
            className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 hover-lift-sm"
          >
            <LayoutGridIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Explore</span>
          </Link>
          
          <Link 
            href="/profile" 
            className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 hover-lift-sm"
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
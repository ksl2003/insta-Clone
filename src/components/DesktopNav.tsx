import {
  CameraIcon,
  HomeIcon,
  LayoutGridIcon,
  SearchIcon,
  UserIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function DesktopNav() {
  const session = await auth();

  return (
    <nav className="hidden lg:block w-64 border-r border-border bg-card/50 backdrop-blur-sm">
      <div className="sticky top-0 h-screen flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 ig-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="ig-heading text-xl font-bold ig-gradient-text">
              Infocus
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group hover-lift-sm"
          >
            <HomeIcon className="w-6 h-6" />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            href="/search"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group hover-lift-sm"
          >
            <SearchIcon className="w-6 h-6" />
            <span className="font-medium">Search</span>
          </Link>

          <Link
            href="/browse"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group hover-lift-sm"
          >
            <LayoutGridIcon className="w-6 h-6" />
            <span className="font-medium">Explore</span>
          </Link>

          <Link
            href="/profile"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group hover-lift-sm"
          >
            <UserIcon className="w-6 h-6" />
            <span className="font-medium">Profile</span>
          </Link>

          <Link
            href="/create"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group hover-lift-sm"
          >
            <CameraIcon className="w-6 h-6" />
            <span className="font-medium">Create</span>
          </Link>
        </div>

        {/* Logout Button */}
        {session && (
          <div className="p-4 border-t border-border">
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-colors duration-200 group hover-lift-sm w-full"
              >
                <LogOutIcon className="w-6 h-6" />
                <span className="font-medium">Logout</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}

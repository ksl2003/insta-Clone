"use client";
import { updateProfile } from "@/actions";
import { Profile } from "@prisma/client";
import { Button, Switch, TextArea, TextField } from "@radix-ui/themes";
import { UserIcon, CameraIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SettingsForm({ profile }: { profile: Profile | null }) {
  const router = useRouter();
  const fileInRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize dark mode state
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");
    setIsDarkMode(theme === "dark");
  }, []);

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        response.json().then((url) => {
          setAvatarUrl(url);
          setIsUploading(false);
        });
      });
    }
  }, [file]);

  const handleThemeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark);
    const theme = isDark ? "dark" : "light";
    const html = document.querySelector("html");
    if (html) {
      html.dataset.theme = theme;
      html.classList.toggle("dark", isDark);
    }
    localStorage.setItem("theme", theme);
  };

  return (
    <form
      action={async (data: FormData) => {
        await updateProfile(data);
        router.push("/profile");
        router.refresh();
      }}
    >
      <input type="hidden" name="avatar" value={avatarUrl || ""} />

      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Profile Picture</label>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-border">
                {avatarUrl ? (
                  <img
                    className="w-full h-full object-cover"
                    src={avatarUrl}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                ref={fileInRef}
                className="hidden"
                accept="image/*"
                onChange={(ev) => setFile(ev.target.files?.[0] || null)}
              />
              <Button
                type="button"
                variant="surface"
                onClick={() => fileInRef.current?.click()}
                disabled={isUploading}
                className="btn btn-secondary"
              >
                <CameraIcon className="w-4 h-4 mr-2" />
                {isUploading ? "Uploading..." : "Change Photo"}
              </Button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <TextField.Root
              name="username"
              defaultValue={profile?.username || ""}
              placeholder="your_username"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <TextField.Root
              name="name"
              defaultValue={profile?.name || ""}
              placeholder="John Doe"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <TextField.Root
              name="subtitle"
              defaultValue={profile?.subtitle || ""}
              placeholder="Graphic designer"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <TextArea
              name="bio"
              defaultValue={profile?.bio || ""}
              placeholder="Tell us about yourself..."
              className="min-h-24 resize-none"
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <label className="text-sm font-medium">Dark Mode</label>
            <p className="text-xs text-muted-foreground">
              Switch between light and dark themes
            </p>
          </div>
          <Switch checked={isDarkMode} onCheckedChange={handleThemeToggle} />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          variant="solid"
          className="btn btn-primary px-8 py-3"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}

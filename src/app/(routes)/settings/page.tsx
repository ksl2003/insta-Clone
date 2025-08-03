import {auth, signOut} from "@/auth";
import SettingsForm from "@/components/SettingsForm";
import {prisma} from "@/db";
import {Button} from "@radix-ui/themes";
import {LogOutIcon, UserIcon} from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.email) {
    return 'not logged in';
  }
  const profile = await prisma.profile.findFirst({
    where: {email: session.user.email},
  });
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6 space-y-6 hover-lift">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover-lift">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-serif">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
          <p className="text-sm text-muted-foreground">
            {session.user.email}
          </p>
        </div>
        
        <SettingsForm profile={profile} />
        
        <div className="border-t border-border pt-6">
          <form action={async () => {
            'use server';
            await signOut();
          }}>
            <Button 
              type="submit" 
              variant="outline"
              className="w-full btn btn-secondary hover-lift-sm"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
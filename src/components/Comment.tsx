import Avatar from "@/components/Avatar";
import {Profile} from "@prisma/client";
import {format} from 'date-fns';

export default function Comment ({
  text,
  createdAt,
  authorProfile,
}:{
  text: string;
  createdAt: Date;
  authorProfile?: Profile;
}) {
  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <Avatar src={authorProfile?.avatar || ''} fallback={authorProfile?.name?.charAt(0) || 'U'}/>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="font-medium text-foreground">
            {authorProfile?.name}
          </h3>
          <span className="text-xs text-muted-foreground">
            @{authorProfile?.username}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(createdAt, 'MMM d')}
          </span>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
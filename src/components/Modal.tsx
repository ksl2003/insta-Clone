'use client';

import {useRouter} from "next/navigation";
import {ReactNode} from "react";
import {XIcon} from "lucide-react";

export default function Modal({children}:{children: ReactNode}) {
  const router = useRouter();
  
  return (
    <div
      onClick={() => router.back()}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-xl shadow-2xl overflow-hidden hover-lift">
        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-accent rounded-full transition-colors hover-lift-sm"
        >
          <XIcon className="w-5 h-5" />
        </button>
        
        {/* Modal Content */}
        <div
          onClick={(ev) => ev.stopPropagation()}
          className="overflow-y-auto max-h-[90vh]"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
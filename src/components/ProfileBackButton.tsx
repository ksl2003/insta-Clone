"use client";
import { ArrowLeftIcon } from "lucide-react";

export default function ProfileBackButton() {
  return (
    <button
      className="p-2 rounded-full"
      onClick={() => (window.location.href = "/")}
    >
      <ArrowLeftIcon className="w-5 h-5" />
    </button>
  );
}

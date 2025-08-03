'use client';
import {TextField} from "@radix-ui/themes";
import {SearchIcon} from "lucide-react";
import {useRouter} from "next/navigation";

export default function SearchForm() {
  const router = useRouter();
  return (
    <form action={async data => {
      router.push('/search?query=' + data.get('query'));
      router.refresh();
    }}>
      <div className="relative">
        <TextField.Root
          name="query"
          placeholder="Search for posts or users..."
          className="w-full pl-12 pr-4 py-3"
        >
          <TextField.Slot className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </TextField.Slot>
        </TextField.Root>
      </div>
    </form>
  );
}
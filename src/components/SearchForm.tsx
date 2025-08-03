"use client";
import { TextField } from "@radix-ui/themes";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  return (
    <form
      action={async (data) => {
        router.push("/search?query=" + data.get("query"));
        router.refresh();
      }}
    >
      <div className="relative">
        <TextField.Root
          name="query"
          className="w-full pl-12 pr-4 py-3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        >
          {query === "" && (
            <TextField.Slot className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-muted-foreground" />
            </TextField.Slot>
          )}
        </TextField.Root>
      </div>
    </form>
  );
}

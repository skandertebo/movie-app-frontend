"use client";
import { Button, Input } from "@material-tailwind/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchOptions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("search", searchQuery);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleReset = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("search");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") ?? ""
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("search") ?? "");
  }, [searchParams, setSearchQuery]);

  return (
    <section className="border-b-2 w-full px-2 py-2 border-blue-gray-300">
      <form
        action="/"
        method="get"
        className="flex flex-wrap gap-2"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="w-[60%]">
          <Input
            className="w-full"
            label="Search Movie"
            crossOrigin={undefined}
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </form>
    </section>
  );
}

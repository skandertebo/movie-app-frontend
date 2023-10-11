"use client";
import { LoadingContextProvider } from "@/context/LoadingContext";
import Movie from "@/types/movie.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MovieList from "../MovieList";
import SearchOptions from "../SearchOptions";
export const LIMIT = 10;
export default function HomeComponent({ movies }: { movies: Movie[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const page = parseInt(params.get("page") ?? "1");
  const pathname = usePathname();
  const handleIncrementPage = () => {
    const newUrlSearchParams = new URLSearchParams(params);
    newUrlSearchParams.set("page", (page + 1).toString());
    router.push(`${pathname}?${newUrlSearchParams.toString()}`);
  };

  const handleDecrementPage = () => {
    const newUrlSearchParams = new URLSearchParams(params);
    newUrlSearchParams.set("page", (page - 1).toString());
    router.push(`${pathname}?${newUrlSearchParams.toString()}`);
  };

  return (
    <LoadingContextProvider>
      <main className="flex min-h-main flex-col items-center py-8 px-10">
        <SearchOptions />
        <section className="h-full">
          <MovieList movies={movies} />
        </section>
        <section className="w-full flex gap-2 justify-center mt-auto py-4">
          {page > 1 && (
            <button onClick={handleDecrementPage}>
              <AiOutlineLeft className="text-2xl" />
            </button>
          )}
          <p>{page}</p>
          {movies.length >= LIMIT && (
            <button onClick={handleIncrementPage}>
              <AiOutlineRight className="text-2xl" />
            </button>
          )}
        </section>
      </main>
    </LoadingContextProvider>
  );
}

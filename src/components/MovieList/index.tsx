"use client";
import { LoadingContextProvider } from "@/context/LoadingContext";
import Movie from "@/types/movie.type";
import MovieHomeItem from "../Home/MovieHomeItem";

export default function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <LoadingContextProvider>
      {movies.length > 0 && (
        <ul className="flex flex-wrap gap-4">
          {movies.map((m, idx) => (
            <li key={idx}>
              <MovieHomeItem movie={m} />
            </li>
          ))}
        </ul>
      )}
      {movies.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-10">
          <h1 className="text-2xl font-semibold">No Movies Found</h1>
          <p className="text-lg">Try searching for another movie.</p>
        </div>
      )}
    </LoadingContextProvider>
  );
}

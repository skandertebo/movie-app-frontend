"use client";
import { getImage } from "@/app/constants";
import Movie from "@/types/movie.type";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MovieHomeItem({ movie }: { movie: Movie }) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col justify-center items-center relative h-[350px] overflow-hidden shadow-lg rounded-lg"
      onClick={() => router.push(`/movies/${movie.id}`)}
    >
      <div className="h-[350] rounded-lg">
        <Image
          src={getImage(movie.imageUrl)}
          alt={movie.title}
          style={{
            objectFit: "fill",
          }}
          className="rounded-lg"
          width={200}
          height={350}
        />
      </div>
      <div className="flex flex-col items-center bg-black bg-opacity-50 absolute bottom-0 left-0 h-[150px] overflow-hidden p-2">
        <h1 className="text-2xl font-semibold text-white">{movie.title}</h1>
        <p className="text-white text-sm">
          {movie.description.slice(0, 100)}...
        </p>
      </div>
    </div>
  );
}

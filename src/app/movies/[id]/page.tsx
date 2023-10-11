import { getImage } from "@/app/constants";
import MovieService from "@/services/movie.service";
import Image from "next/image";

async function getMovieById(id: string | number) {
  const res = await MovieService.getMovie(id);
  return res;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const movie = await getMovieById(params.id);
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{movie.title}</h1>
        <h4>{movie.releaseYear}</h4>
        <hr className="w-[80%] border-blue-gray-600" />
      </div>
      <div className="flex flex-wrap gap-4">
        <Image
          src={getImage(movie.imageUrl)}
          alt={movie.title}
          width={200}
          height={350}
        />
        <p>{movie.description}</p>
      </div>
    </div>
  );
};

export default Page;

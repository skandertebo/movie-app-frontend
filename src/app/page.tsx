import HomeComponent from "@/components/Home";
import MovieService from "@/services/movie.service";
import { delay } from "@/utils/other.utils";
import { Suspense } from "react";
import LoadingHomePage from "./loading";
const getMovies = async (
  page: number,
  limit: number = 10,
  year?: number | undefined,
  month?: number | undefined,
  search?: string | undefined
) => {
  const moviesPromise = MovieService.getMovies(
    page,
    limit,
    year,
    month,
    search
  );
  const [movies, _] = await Promise.all([moviesPromise, delay(1000)]);
  return movies;
};
const LIMIT = 10;

export default async function Home({
  searchParams,
}: {
  searchParams: {
    year?: string | undefined;
    month?: string | undefined;
    search?: string | undefined;
    page?: string | undefined;
  };
}) {
  const params = new URLSearchParams(searchParams);

  return (
    <Suspense key={params.toString()} fallback={<LoadingHomePage />}>
      <HomeComponentWrapper searchParams={searchParams} />
    </Suspense>
  );
}

const HomeComponentWrapper = async ({
  searchParams,
}: {
  searchParams: {
    year?: string | undefined;
    month?: string | undefined;
    search?: string | undefined;
    page?: string | undefined;
  };
}) => {
  const {
    year: searchYear,
    month: searchMonth,
    search: searchQuery,
    page: searchPage,
  } = searchParams;
  const movies = await getMovies(
    searchPage ? parseInt(searchPage) : 1,
    LIMIT,
    searchYear ? parseInt(searchYear) : undefined,
    searchMonth ? parseInt(searchMonth) : undefined,
    searchQuery
  );
  return <HomeComponent movies={movies} />;
};

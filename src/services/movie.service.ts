import Movie from "@/types/movie.type";
import { apiService } from "./api.service";

export default class MovieService {
  static async getMovies(
    page: number,
    limit: number = 10,
    year?: number | undefined,
    month?: number | undefined,
    search?: string | undefined
  ) {
    const searchParams = new URLSearchParams();
    searchParams.append("page", page.toString());
    searchParams.append("offset", limit.toString());
    if (year) {
      searchParams.append("year", year.toString());
    }
    if (month) {
      searchParams.append("month", month.toString());
    }
    if (search) {
      searchParams.append("q", search.toString());
    }
    const res = await apiService.get<Movie[]>(
      `/movie?${searchParams.toString()}`
    );
    return res.data;
  }

  static async getMovie(id: number | string) {
    const res = await apiService.get<Movie>(`/movie/${id}`);
    return res.data;
  }
}

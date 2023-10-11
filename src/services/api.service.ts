import { apiBaseUrl } from "@/app/constants";
import axios from "axios";

export const apiService = axios.create({
  baseURL: apiBaseUrl,
});

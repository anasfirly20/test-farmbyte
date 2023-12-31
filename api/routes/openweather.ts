import api from "../api";
import { TGETCurrentWeather, TGETForecast } from "@/types/types";

export const getCurrentWeather = async (
  city: string
): Promise<TGETCurrentWeather> => {
  const res = await api.get(
    `/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
  );
  return res.data;
};

export const getForecastWeather = async (
  cityId: number
): Promise<TGETForecast> => {
  const res = await api.get(
    `/forecast?id=${cityId}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric&cnt=7`
  );
  return res.data;
};

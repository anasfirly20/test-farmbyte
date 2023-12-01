import api from "../api";

export const getCurrentWeather = async (city: string) => {
  const res = await api.get(
    `/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
  );
  return res.data;
};

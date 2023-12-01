import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  //   headers: {
  //     Authorization: process.env.NEXT_PUBLIC_API_KEY,
  //   },
});

export default instance;

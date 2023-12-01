// Day
import day1 from "../../../public/animated/01d.svg";
import day2 from "../../../public/animated/02d.svg";
import day3 from "../../../public/animated/03d.svg";
import day4 from "../../../public/animated/04d.svg";
import day5 from "../../../public/animated/09d.svg";
import day6 from "../../../public/animated/10d.svg";
import day7 from "../../../public/animated/11d.svg";
import day8 from "../../../public/animated/13d.svg";
import day9 from "../../../public/animated/50d.svg";

// Night
import night1 from "../../../public/animated/01n.svg";
import night2 from "../../../public/animated/02n.svg";
import night3 from "../../../public/animated/03n.svg";
import night4 from "../../../public/animated/04n.svg";
import night5 from "../../../public/animated/09n.svg";
import night6 from "../../../public/animated/10n.svg";
import night7 from "../../../public/animated/11n.svg";
import night8 from "../../../public/animated/13n.svg";
import night9 from "../../../public/animated/50n.svg";

type TIconMapping = {
  [key: string]: string;
};

export const getWeatherIcon = (iconCode: string) => {
  const weatherIconMappings: TIconMapping = {
    // Day
    "01d": day1,
    "02d": day2,
    "03d": day3,
    "04d": day4,
    "09d": day5,
    "10d": day6,
    "11d": day7,
    "13d": day8,
    "50d": day9,

    // Night
    "01n": night1,
    "02n": night2,
    "03n": night3,
    "04n": night4,
    "09n": night5,
    "10n": night6,
    "11n": night7,
    "13n": night8,
    "50n": night9,
  };

  return weatherIconMappings[iconCode] || day1;
};

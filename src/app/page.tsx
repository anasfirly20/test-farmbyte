"use client";

// Next ui
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

// Assets
// Day
import day1 from "../../public/animated/01d.svg";
import day2 from "../../public/animated/02d.svg";
import day3 from "../../public/animated/03d.svg";
import day4 from "../../public/animated/04d.svg";
import day5 from "../../public/animated/09d.svg";
import day6 from "../../public/animated/10d.svg";
import day7 from "../../public/animated/11d.svg";
import day8 from "../../public/animated/13d.svg";
import day9 from "../../public/animated/50d.svg";

// Night
import night1 from "../../public/animated/01n.svg";
import night2 from "../../public/animated/02n.svg";
import night3 from "../../public/animated/03n.svg";
import night4 from "../../public/animated/04n.svg";
import night5 from "../../public/animated/09n.svg";
import night6 from "../../public/animated/10n.svg";
import night7 from "../../public/animated/11n.svg";
import night8 from "../../public/animated/13n.svg";
import night9 from "../../public/animated/50n.svg";

// Components
import Empty from "@/components/Empty";

// Api
import {
  getCurrentWeather,
  getForecastWeather,
} from "../../api/routes/openweather";
import { useState } from "react";
import { TGETCurrentWeather, TList } from "@/types/types";

// Miscellaneous
import moment from "moment";
import Image from "next/image";

export default function Home() {
  const [dataCurrentWeather, setDataCurrentWeather] =
    useState<TGETCurrentWeather>();
  const [dataForecast, setDataForecast] = useState<TList[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getWeather = async (string: string) => {
    try {
      setIsLoading(true);
      const res = await getCurrentWeather(string);
      setDataCurrentWeather(res);
      console.log(res);
      getForecast(res?.id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchString) {
      getWeather(searchString);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getForecast = async (cityId: number) => {
    try {
      const res = await getForecastWeather(cityId);
      setDataForecast(res?.list);
      console.log("RES 2>>", res);
    } catch (error) {
      console.log(error);
    }
  };

  type TIconMapping = {
    [key: string]: string;
  };

  const getWeatherIcon = (iconCode: string) => {
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

  return (
    <section className="py-longer px-longer h-[95vh]">
      <section className="flex items-center justify-between flex-wrap gap-y-3">
        <Input
          type="text"
          placeholder="Enter a city..."
          variant="bordered"
          size="sm"
          radius="md"
          className="w-full lg:w-[89%]"
          onChange={(e) => setSearchString(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button
          color="primary"
          size="lg"
          radius="md"
          className="w-full lg:w-[10%] bg-sky-600"
          isLoading={isLoading}
          isDisabled={searchString ? false : true}
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </Button>
      </section>
      {dataCurrentWeather ? (
        <>
          <section>
            <div className="flex items-center mt-6">
              <Image
                src={
                  dataCurrentWeather?.weather?.[0]?.icon &&
                  getWeatherIcon(dataCurrentWeather?.weather?.[0]?.icon)
                }
                alt="snowy"
                width={120}
                height={120}
              />
              <h1 className="text-sky-600">{dataCurrentWeather?.name}</h1>
            </div>
            <p className="text-gray-400">
              {dataCurrentWeather?.dt &&
                moment.unix(dataCurrentWeather?.dt).format("dddd, D MMMM YYYY")}
            </p>
            <h2 className="flex items-start text-sky-600 mt-4">
              {dataCurrentWeather?.main?.temp &&
                Math.floor(dataCurrentWeather?.main?.temp)}{" "}
              <span className="text-sm">&deg;C</span>
            </h2>
            <p className="text-base text-gray-500">
              {dataCurrentWeather?.weather?.[0]?.main}
            </p>
            <p className="text-base text-gray-500">
              {dataCurrentWeather?.weather?.[0]?.description}
            </p>
            <p className="text-gray-500 mt-4">
              Wind: {dataCurrentWeather?.wind?.speed} m/s
            </p>
            <p className="text-gray-500">
              Humidity: {dataCurrentWeather?.main?.humidity}%
            </p>
          </section>
          <hr className="border-b my-6" />
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-y-20 mt-10">
            {dataForecast?.map((data, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center gap-1"
                >
                  <h5>{data?.dt && moment.unix(data?.dt).format("HH:mm")}</h5>
                  <Image
                    priority
                    src={
                      data?.weather?.[0]?.icon &&
                      getWeatherIcon(data?.weather?.[0]?.icon)
                    }
                    alt="Weather's icon"
                    width={60}
                    height={60}
                  />
                  <p>{data?.main?.temp && Math.floor(data?.main?.temp)}&deg;</p>
                </div>
              );
            })}
          </section>
        </>
      ) : (
        <Empty />
      )}
    </section>
  );
}

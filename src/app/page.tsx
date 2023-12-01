"use client";

// Next ui
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

// Components
import Empty from "@/components/Empty";

// Api
import {
  getCurrentWeather,
  getForecastWeather,
} from "../../api/routes/openweather";

// Miscellaneous
import { useState } from "react";
import moment from "moment";
import Image from "next/image";
import { getWeatherIcon } from "@/lib/helpers/utils";
import { TGETCurrentWeather, TList } from "@/types/types";
import Error from "@/components/Error";

export default function Home() {
  const [dataCurrentWeather, setDataCurrentWeather] =
    useState<TGETCurrentWeather>();
  const [dataForecast, setDataForecast] = useState<TList[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getWeather = async (string: string) => {
    try {
      setIsLoading(true);
      const res = await getCurrentWeather(string);
      setDataCurrentWeather(res);
      getForecast(res?.id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-longer px-longer lg:h-[95vh]">
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
      {isError ? (
        <Error />
      ) : dataCurrentWeather ? (
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
          <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-20 mt-10">
            <div className="flex flex-col justify-center items-center gap-1">
              <h5>Now</h5>
              <Image
                priority
                src={
                  dataCurrentWeather?.weather?.[0]?.icon &&
                  getWeatherIcon(dataCurrentWeather?.weather?.[0]?.icon)
                }
                alt="Weather's icon"
                width={60}
                height={60}
              />
              <p>
                {dataCurrentWeather?.main?.temp &&
                  Math.floor(dataCurrentWeather?.main?.temp)}
                &deg;
              </p>
            </div>
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

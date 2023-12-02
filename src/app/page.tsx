"use client";

// Next ui
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

// Components
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import Forecast from "@/components/Home/Forecast";
import CurrentWeather from "@/components/Home/CurrentWeather";

// Api
import {
  getCurrentWeather,
  getForecastWeather,
} from "../../api/routes/openweather";

// Miscellaneous
import { useState } from "react";
import { TGETCurrentWeather, TList } from "@/types/types";

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
      setIsError(false);
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
          onClick={() => handleSearch()}
        >
          Search
        </Button>
      </section>
      {isError ? (
        <Error />
      ) : dataCurrentWeather ? (
        <>
          <CurrentWeather
            isLoading={isLoading}
            dataCurrentWeather={dataCurrentWeather}
          />
          <hr className="border-b my-6" />
          <Forecast
            isLoading={isLoading}
            dataCurrentWeather={dataCurrentWeather}
            dataForecast={dataForecast}
          />
        </>
      ) : (
        <Empty />
      )}
    </section>
  );
}

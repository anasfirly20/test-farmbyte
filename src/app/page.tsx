"use client";

// Next ui
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

// Assets
import snowy1 from "../../public/animated/snowy-3.svg";

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
              <Image src={snowy1} alt="snowy" width={120} height={120} />
              <h1 className="text-sky-600">{dataCurrentWeather?.name}</h1>
            </div>
            <p className="text-gray-400">
              {dataCurrentWeather?.dt &&
                moment
                  .unix(dataCurrentWeather?.dt)
                  .format("dddd, D MMMM YYYY, HH:mm")}
              {/* {dataCurrentWeather?.dt && moment.unix(dataCurrentWeather?.dt).format("MMMM D, YYYY")} */}
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
                  <Image src={snowy1} alt="snowy" width={60} height={60} />
                  <p>{data?.main?.temp && Math.floor(data?.main?.temp)}&deg;</p>
                  {/* <div className="flex gap-2">
                      <p>58&deg;</p>
                      <div className="border-l-2 border-gray-400" />
                      <p className="text-gray-400">44&deg;</p>
                    </div> */}
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

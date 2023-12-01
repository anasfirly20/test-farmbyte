"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import snowy1 from "../../public/animated/snowy-3.svg";
import Image from "next/image";

import { getCurrentWeather } from "../../api/routes/openweather";
import { useState } from "react";
import { TGETCurrentWeather } from "@/types/types";

export default function Home() {
  const [data, setData] = useState<TGETCurrentWeather>();
  const [searchString, setSearchString] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getWeather = async (string: string) => {
    try {
      setIsLoading(true);
      const res = await getCurrentWeather(string);
      setData(res);
      console.log(res);
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

  return (
    <section className="py-longer px-longer h-[100vh]">
      <section className="flex items-center justify-between flex-wrap gap-y-3">
        <Input
          type="text"
          placeholder="Enter a city..."
          variant="bordered"
          size="sm"
          radius="md"
          className="w-full lg:w-[89%]"
          onChange={(e) => setSearchString(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
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
      <section className="">
        <div className="flex items-center my-6">
          <Image src={snowy1} alt="snowy" width={120} height={120} />
          <h1 className="text-sky-600">{data?.name}</h1>
        </div>
        <p className="text-gray-400">Thursday 8:18 AM</p>
        <h2 className="flex items-start text-sky-600 my-5">
          {data?.main?.temp && Math.floor(data?.main?.temp)}{" "}
          <span className="text-sm">&deg;C</span>
        </h2>
        <p className="text-gray-500">Wind: {data?.wind?.speed} mph</p>
        <p className="text-gray-500">Humidity: {data?.main?.humidity}%</p>
      </section>
      <hr className="border-b my-6" />
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-y-20 mt-10">
        {Array(7)
          ?.fill(7)
          ?.map((_, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-1"
              >
                <h5>Thu</h5>
                <Image src={snowy1} alt="snowy" width={60} height={60} />
                <div className="flex gap-2">
                  <p>58&deg;</p>
                  <div className="border-l-2 border-gray-400" />
                  <p className="text-gray-400">44&deg;</p>
                </div>
              </div>
            );
          })}
      </section>
      <p className="mt-10 lg:mt-36 text-center text-gray-500">
        Created with Next Js and TailwindCSS
      </p>
    </section>
  );
}

import { getWeatherIcon } from "@/lib/helpers/utils";
import { TGETCurrentWeather, TList } from "@/types/types";
import { Skeleton } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import React from "react";

type TProps = {
  isLoading: boolean;
  dataCurrentWeather: TGETCurrentWeather;
  dataForecast: TList[];
};

export default function Forecast({
  isLoading,
  dataCurrentWeather,
  dataForecast,
}: TProps) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-20 mt-10">
      <div className="flex flex-col justify-center items-center gap-1">
        <Skeleton isLoaded={!isLoading} className="w-fit">
          <h5>Now</h5>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} className="w-fit">
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
        </Skeleton>
        <Skeleton isLoaded={!isLoading} className="w-fit">
          <p>
            {dataCurrentWeather?.main?.temp &&
              Math.floor(dataCurrentWeather?.main?.temp)}
            &deg;
          </p>
        </Skeleton>
      </div>
      {dataForecast?.map((data, index: number) => {
        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-1"
          >
            <Skeleton isLoaded={!isLoading} className="w-fit">
              <h5>{data?.dt && moment.unix(data?.dt).format("HH:mm")}</h5>
            </Skeleton>
            <Skeleton isLoaded={!isLoading} className="w-fit">
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
            </Skeleton>
            <Skeleton isLoaded={!isLoading} className="w-fit">
              <p>{data?.main?.temp && Math.floor(data?.main?.temp)}&deg;</p>
            </Skeleton>
          </div>
        );
      })}
    </section>
  );
}

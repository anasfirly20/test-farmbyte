// Next ui
import { Skeleton } from "@nextui-org/skeleton";

// Miscellaneous
import { TGETCurrentWeather } from "@/types/types";
import { getWeatherIcon } from "@/lib/helpers/utils";
import Image from "next/image";
import moment from "moment";

type TProps = {
  isLoading: boolean;
  dataCurrentWeather: TGETCurrentWeather;
};

export default function CurrentWeather({
  isLoading,
  dataCurrentWeather,
}: TProps) {
  return (
    <section>
      <div className="flex items-center mt-6">
        <Skeleton isLoaded={!isLoading} className="w-fit">
          <Image
            src={
              dataCurrentWeather?.weather?.[0]?.icon &&
              getWeatherIcon(dataCurrentWeather?.weather?.[0]?.icon)
            }
            alt="snowy"
            width={120}
            height={120}
          />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} className="w-fit">
          <h1 className="text-sky-600">{dataCurrentWeather?.name}</h1>
        </Skeleton>
      </div>
      <Skeleton isLoaded={!isLoading} className="w-fit">
        <p className="text-gray-400">
          {dataCurrentWeather?.dt &&
            moment
              .unix(dataCurrentWeather?.dt)
              .format("dddd, D MMMM YYYY, HH:mm")}
        </p>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} className="w-fit">
        <h2 className="flex items-start text-sky-600 mt-4">
          {dataCurrentWeather?.main?.temp &&
            Math.floor(dataCurrentWeather?.main?.temp)}{" "}
          <span className="text-sm">&deg;C</span>
        </h2>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} className="w-fit">
        <p className="text-base text-gray-500">
          {dataCurrentWeather?.weather?.[0]?.main}
        </p>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} className="w-fit">
        <p className="text-base text-gray-500">
          {dataCurrentWeather?.weather?.[0]?.description}
        </p>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} className="w-fit">
        <p className="text-gray-500 mt-4">
          Wind: {dataCurrentWeather?.wind?.speed} m/s
        </p>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} className="w-fit">
        <p className="text-gray-500">
          Humidity: {dataCurrentWeather?.main?.humidity}%
        </p>
      </Skeleton>
    </section>
  );
}

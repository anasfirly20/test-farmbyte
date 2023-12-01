type TGETCurrentWeather = {
  coord: TCoord;
  weather: TWeather[];
  base: string;
  main: TMain;
  visibility: number;
  wind: TWind;
  clouds: TClouds;
  dt: number;
  sys: TSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type TClouds = {
  all: number;
};

type TCoord = {
  lon: number;
  lat: number;
};

type TMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type TSys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

type TWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type TWind = {
  speed: number;
  deg: number;
  gust: number;
};

// Forecast
type TGETForecast = {
  cod: string;
  message: number;
  cnt: number;
  list: TList[];
  city: TCity;
};

type TCity = {
  id: number;
  name: string;
  coord: TCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type TCoord = {
  lat: number;
  lon: number;
};

type TList = {
  dt: number;
  main: TMainClass;
  weather: TWeather[];
  clouds: TClouds;
  wind: TWind;
  visibility: number;
  pop: number;
  sys: TSys;
  dt_txt: Date;
  snow?: TSnow;
};

type TClouds = {
  all: number;
};

type TMainClass = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type TSnow = {
  "3h": number;
};

type TSys = {
  pod: Pod;
};

export enum Pod {
  D = "d",
  N = "n",
}

type TWeather = {
  id: number;
  main: MainEnum;
  description: Description;
  icon: Icon;
};

export enum Description {
  BrokenClouds = "broken clouds",
  LightSnow = "light snow",
  OvercastClouds = "overcast clouds",
  ScatteredClouds = "scattered clouds",
  Snow = "snow",
}

export enum Icon {
  The03N = "03n",
  The04D = "04d",
  The04N = "04n",
  The13D = "13d",
  The13N = "13n",
}

export enum MainEnum {
  Clouds = "Clouds",
  Snow = "Snow",
}

type TWind = {
  speed: number;
  deg: number;
  gust: number;
};

type WeatherData = {
  lat: number;
  lon: number;
  name: string;
  current: any;
  daily: {
    humidity: number;
    dt: number;
    temp: {
      day: number;
    };
    weather: {
      main: string;
      icon: any;
      description: string;
    }[];
  }[];
};

type SingleDayData = WeatherData['daily'][0];


interface DayLoopedProps {
  day: SingleDayData;
  dayOfWeek: string;
  onClick: () => void;
}

interface SingleDayProps {
  day: SingleDayData;
  dayOfWeek: string;
  name: string;
}

export type { WeatherData, SingleDayData, DayLoopedProps, SingleDayProps };
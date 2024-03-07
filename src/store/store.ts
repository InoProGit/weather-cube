import { fetchWeatherData as fetchWeatherDataAPI, getCityName } from '../api/api';
import { WeatherData, SingleDayData } from '../types';
import { useLocalObservable } from 'mobx-react';
import { flow } from 'mobx';

type Store = {
  weatherData: WeatherData | null;
  currentWeather: string;
  loading: boolean;
  selectedDay: SingleDayData | null;
  fetchWeatherData: () => Promise<void>;
  changeDay: (day: SingleDayData) => void;
};

export const useStore = () => useLocalObservable<Store>(() => ({
  weatherData: null,
  currentWeather: 'Rain',
  loading: true,
  selectedDay: null,

  fetchWeatherData: flow(function* (this: Store) {
    this.loading = true;
    try {
      const data: WeatherData = yield fetchWeatherDataAPI();
      const cityName: string = yield getCityName(data.lat, data.lon);
      this.weatherData = { ...data, name: cityName };
      this.selectedDay = data.daily[0];
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }),

  changeDay(day: SingleDayData) {
    this.selectedDay = day;
    this.currentWeather = day.weather[0].main;
  }
}));
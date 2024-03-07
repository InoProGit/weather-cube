import axios from 'axios';
import { WeatherData } from '../types';

export const fetchWeatherData = async (): Promise<WeatherData> => {
  const { data } = await axios.get<WeatherData>(
    'https://api.openweathermap.org/data/3.0/onecall', {
    params: {
      lat: 59.9343,
      lon: 30.3351,
      exclude: 'current,minutely,hourly,alerts',
      appid: 'b7b3db6209307b4929aa1df72ced2c3f',
      units: 'metric',
    },
  }
  );
  return data;
};

export const getCityName = async (lat: number, lon: number) => {
  const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=b7b3db6209307b4929aa1df72ced2c3f`);
  return response.data[0].name;
}
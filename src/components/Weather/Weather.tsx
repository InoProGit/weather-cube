import { useEffect, useState } from 'react'
import { useStore } from '../../store/store';
import { observer } from 'mobx-react';

import { SingleDayData } from '../../types';

import SingleDay from '../SingleDay/SingleDay';
import DayLooped from '../DayLooped/DayLooped';
import getDayOfWeek from '../../utils/dateUtils';
import { getWeatherAnimation } from '../../utils/weatherAnimation';
import './Weather.css';

import Lottie from 'react-lottie';


function Weather() {
  const store = useStore();
  const [currentWeather, setCurrentWeather] = useState('Rain');
  const [animationData, setAnimationData] = useState<any>(null); // type any for example json data

  const handleDayChange = (day: SingleDayData) => {
    store.changeDay(day);
    setCurrentWeather(day.weather[0].main);
  }

  useEffect(() => {
    store.fetchWeatherData();
  }, [store]);

  useEffect(() => {
    if (currentWeather) {
      getWeatherAnimation(currentWeather).then((animation) => {
        setAnimationData(animation.default);
      });
    }
  }, [currentWeather]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      {store.loading ? (
        <p>Loading...</p>
      ) : (
        store.weatherData && (
          <div className="weather-block">
            {currentWeather && <div className="animation">
              <Lottie
                options={{ ...defaultOptions, animationData: animationData }}
              />
            </div>}
            <div className="days-wrapper">
              {store.selectedDay &&
                <SingleDay day={store.selectedDay} dayOfWeek={getDayOfWeek(store.selectedDay.dt)} name={store.weatherData?.name} />
              }
              <div className="all-days">
                {store.weatherData?.daily.map((day, index) => {
                  return (
                    <DayLooped
                      day={day}
                      dayOfWeek={getDayOfWeek(day.dt)}
                      onClick={() => handleDayChange(day)}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default observer(Weather)
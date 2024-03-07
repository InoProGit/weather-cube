export const getWeatherAnimation = async (weather: string) => {
  switch (weather) {
    case 'Clear':
      return import('../assets/animations/weather/cloudsDay.json');
    case 'Clouds':
      return import('../assets/animations/weather/cloudsDay.json');
    case 'Rain':
      return import('../assets/animations/weather/rainNight.json');
    case 'Drizzle':
      return import('../assets/animations/weather/rainNight.json');
    case 'Thunderstorm':
      return import('../assets/animations/weather/rainNight.json');
    case 'Snow':
      return import('../assets/animations/weather/rainNight.json');
    case 'Mist':
      return import('../assets/animations/weather/rainNight.json');
    case 'Smoke':
      return import('../assets/animations/weather/rainNight.json');
    case 'Haze':
      return import('../assets/animations/weather/rainNight.json');
    case 'Dust':
      return import('../assets/animations/weather/cloudsDay.json');
    case 'Fog':
      return import('../assets/animations/weather/cloudsDay.json');
    case 'Sand':
      return import('../assets/animations/weather/cloudsDay.json');
    case 'Ash':
      return import('../assets/animations/weather/cloudsDay.json');
    case 'Squall':
      return import('../assets/animations/weather/cloudsDay.json');
    case 'Tornado':
      return import('../assets/animations/weather/cloudsDay.json');
    default:
      return import('../assets/animations/weather/cloudsDay.json');
  }
};
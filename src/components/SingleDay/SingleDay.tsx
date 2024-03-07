import { SingleDayProps } from '../../types'
import '../SingleDay/SingleDay.css'

function SingleDay({ day, dayOfWeek, name }: SingleDayProps) {
  const weather = day.weather[0].description.replace(/^./, day.weather[0].description[0].toUpperCase());
  return (
    <div className="single-day">
      <h2 className="city">{name}</h2>
      <div className="temperature">Temperature: {Math.round(day.temp.day ?? 0)}°</div>
      <div className="day">{dayOfWeek}</div>
      <div className="weather-desc">
        <p>{weather}</p>
      </div>
    </div>
  )
}

export default SingleDay
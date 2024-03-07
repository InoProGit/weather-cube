import { DayLoopedProps } from '../../types'
import '../DayLooped/DayLooped.css';

function DayLooped({ day, dayOfWeek, onClick }: DayLoopedProps) {
  return (
    <div className="looped-day" onClick={onClick}>
      <div className="day">{dayOfWeek}</div>
      <div className="ico">
        {day.weather[0].icon && (
          <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="weather icon" />
        )}
      </div>
      <div className="temp">{Math.round(day.temp.day)}°</div>
      <div className="humidity">{day.humidity}%</div>
    </div>
  )
}

export default DayLooped;
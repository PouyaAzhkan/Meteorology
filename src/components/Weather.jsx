import React from "react";
import { DayOfWeek } from "./DayOfWeek";

const Weather = ({ weather, locationData }) => {

  const { 
    temperature_2m_max: max,
    temperature_2m_min: min,
    weathercode: codes,
    time: dates
  } = weather

  return (
    <div>
      <h2>Weather {locationData}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <DayOfWeek 
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            itsToday={ i === 0 }
            key={date}
          />
        ))}
      </ul>
    </div>
  );
};

export { Weather };

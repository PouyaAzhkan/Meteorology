import React from "react";
// for Beutifuling Weather temperature
const getWeatherIcon = (wmoCode) => {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
};
// for Beutifuling day font
const formatDay = (dateStr) => {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
};

const DayOfWeek = ({ date, max, min, code, itsToday }) => {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{itsToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}</strong>
      </p>
    </li>
  );
};

export { DayOfWeek };

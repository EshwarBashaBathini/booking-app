import { useState } from "react";
import './index.css'

function HorizontalDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate 5 days from startDate
  const getFiveDays = () => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      arr.push(new Date(d));
    }
    return arr;
  };

  const dates = getFiveDays();

  // Move Forward 5 Days
  const nextDays = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + 5);
    setStartDate(newDate);
  };

  // Move Back 5 Days (But don't go before today)
  const prevDays = () => {
    const today = new Date();
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() - 5);

    if (newDate >= today.setHours(0, 0, 0, 0)) {
      setStartDate(newDate);
    }
  };

  return (
    <div className="calendar-wrapper">
      <button onClick={prevDays}>◀</button>

      <div className="date-container">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`date-item ${
              selectedDate.toDateString() === date.toDateString()
                ? "active-date"
                : ""
            }`}
            onClick={() => setSelectedDate(date)}
          >
            <p>
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </p>
            <h3>{date.getDate()}</h3>
            
          </div>
        ))}
      </div>

      <button onClick={nextDays}>▶</button>
    </div>
  );
}

export default HorizontalDatePicker;

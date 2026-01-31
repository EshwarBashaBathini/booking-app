import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useRef } from "react";
import { addDays, format, isBefore } from "date-fns"; // Import date-fns methods
import "./index.css";

function HorizontalCalendar() {
  const today = new Date();  // Always start with the current date
  const [selected, setSelected] = useState(today);  // Initially select today's date
  const [startDate, setStartDate] = useState(today);  // Initialize start date with today's date
  const swiperRef = useRef(null);

  // Prevent going back to previous dates, only allow moving forward
  const handlePrev = () => {
    const newStart = addDays(startDate, -1);  // Shift back by 1 day
    // Prevent moving past today (disable previous button when it's already on today)
    if (isBefore(newStart, today)) {
      setStartDate(today); // Reset to today if going back
    } else {
      setStartDate(newStart);
    }
    swiperRef.current?.slideTo(0, 0);  // Reset Swiper to start
  };

  const handleNext = () => {
    const newStart = addDays(startDate, 1);  // Shift forward by 1 day
    setStartDate(newStart);
    swiperRef.current?.slideTo(0, 0);  // Reset Swiper to start
  };

  return (
    <div className="calendar-wrapper">
      {/* Disable prev button if start date is today */}
      <button
        className="nav-arrow left"
        onClick={handlePrev}
        disabled={isBefore(startDate, today)}  // Disable if trying to go past today
      >
        ‹
      </button>

      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        allowTouchMove={false}  // Optional: disable swipe
      >
        {[...Array(7)].map((_, i) => {
          const date = addDays(startDate, i);  // Generate the dates for the calendar
          const isActive = format(date, "yyyy-MM-dd") === format(selected, "yyyy-MM-dd");

          return (
            <SwiperSlide key={i}>
              <div
                className={`day-box ${isActive ? "active" : ""}`}
                onClick={() => setSelected(date)}
              >
                <span>{format(date, "EEE")}</span>
                <strong>{format(date, "d")}</strong>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button className="nav-arrow right" onClick={handleNext}>›</button>
    </div>
  );
}

export default HorizontalCalendar;

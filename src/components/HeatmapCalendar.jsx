import React, { useEffect, useState } from "react";
import "./HeatmapCalendar.css";

const userActivity = [];

const HeatmapCalendar = ({ startDate, endDate, dataValues }) => {
  const startingDate = typeof startDate === "string" ? new Date(startDate) : startDate;
  const endingDate = typeof endDate === "string" ? new Date(endDate) : endDate;

  const daysInRange = Math.ceil((endingDate - startingDate) / (1000 * 60 * 60 * 24)) + 1;

  const calendarGrid = Array.from({ length: daysInRange }, (_, i) => {
    const date = new Date(startingDate);
    date.setDate(startingDate.getDate() + i);
    return date.toISOString().slice(0, 10);
  });

  const highestValue = dataValues?.reduce((max, current) => Math.max(max, current.count), -Infinity);

  const getIntensity = (activityCount) => {
    return highestValue !== 0 ? Number(activityCount / highestValue) : 0;
  };

  const getColorFromIntensity = (intensity) => {
    const colorCodes = ["#0D4429", "#016D32", "#26A641", "#3AD353"];
    const colorIndex = Math.min(Math.floor(intensity * colorCodes.length), colorCodes.length - 1);
    return colorCodes[colorIndex];
  };

  return (
    <div className="heatmap-grid">
      {calendarGrid.map((day) => {
        const activityCount = dataValues.find((item) => item.date === day)?.count || 0;
        const intensity = getIntensity(activityCount);
        const color = getColorFromIntensity(intensity);

        return (
          <div
            key={day}
            className="heatmap-day-cell"
            title={`${activityCount} Posts on ${day}`}
            style={{
              backgroundColor: activityCount === 0 ? "#f6f8fa" : color,
            }}
          />
        );
      })}
    </div>
  );
};

const Heatmap = () => {
  const [activityData, setActivityData] = useState([]);

  //MAKE API CALL WITHIN THE USEFFECT BELOW, RIGHT NOW IS JUST DUMMY DATA
  useEffect(() => {
    setActivityData(userActivity);
  }, []);

  const endDate = new Date();

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  return (
    <section className="heatmap-section">
      <div className="heatmap-wrapper">
        <span className="heatmap-days-label">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </span>
        <HeatmapCalendar startDate={startDate} endDate={endDate} dataValues={activityData} />
      </div>
    </section>
  );
};

export default Heatmap;

import React, { useEffect, useState, useRef } from "react";
import "./HeatmapCalendar.css";

const HeatmapCalendar = ({ startDate, endDate, dataValues }) => {
  const containerRef = useRef(null);

  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);
  const daysInRange = Math.ceil((endingDate - startingDate) / (1000 * 60 * 60 * 24));

  const calendarGrid = Array.from({ length: daysInRange }, (_, i) => {
    const date = new Date(startingDate);
    date.setDate(startingDate.getDate() + i);
    return date.toISOString().slice(0, 10);
  });

  const highestValue = dataValues.reduce((max, current) => Math.max(max, current.count), 0);

  const getIntensity = (activityCount) => {
    return highestValue !== 0 ? activityCount / highestValue : 0;
  };

  const getColorFromIntensity = (intensity) => {
    const colorCodes = ["#0D4429", "#016D32", "#26A641", "#3AD353"];
    const colorIndex = Math.min(Math.floor(intensity * colorCodes.length), colorCodes.length - 1);
    return colorCodes[colorIndex];
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [dataValues]);

  return (
    <div className="heatmap-grid-container" ref={containerRef}>
      <div className="heatmap-grid">
        {calendarGrid.map((day) => {
          const activityCount = dataValues.find((item) => item.date === day)?.count || 0;
          const intensity = getIntensity(activityCount);
          const color = activityCount === 0 ? "#f6f8fa" : getColorFromIntensity(intensity);
          return (
            <div
              key={day}
              className="heatmap-day-cell"
              title={`${activityCount} commits on ${day}`}
              style={{ backgroundColor: color }}
            />
          );
        })}
      </div>
    </div>
  );
};

const Heatmap = ({ commits, repoCreationDate }) => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const countsByDate = {};
    commits.forEach((commit) => {
      const dateOnly = commit.created_at.slice(0, 10);
      countsByDate[dateOnly] = (countsByDate[dateOnly] || 0) + 1;
    });

    const activityArray = Object.entries(countsByDate).map(([date, count]) => ({
      date,
      count,
    }));

    setActivityData(activityArray);
  }, [commits]);

  const creationDate = new Date(repoCreationDate);
  const creationYear = creationDate.getFullYear();
  const startDate = new Date(repoCreationDate);
  startDate.setFullYear(creationDate.getFullYear() - 1);
  startDate.setDate(startDate.getDate());
  const dayOfWeek = startDate.getDay();
  console.log(dayOfWeek);
  const endDate = new Date();

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

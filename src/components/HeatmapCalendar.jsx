import React, { useEffect, useState } from "react";
import "./HeatmapCalendar.css"; // Import the new CSS file

const userActivity = [
  { date: "2024-09-01", count: 5 },
  { date: "2024-09-02", count: 10 },
  { date: "2024-09-03", count: 0 },
  { date: "2024-09-04", count: 7 },
  { date: "2024-09-05", count: 12 },
  { date: "2024-09-06", count: 8 },
  { date: "2024-09-07", count: 6 },
  { date: "2024-09-08", count: 4 },
  { date: "2024-09-09", count: 9 },
  { date: "2024-09-10", count: 11 },
  { date: "2024-09-11", count: 15 },
  { date: "2024-09-12", count: 6 },
  { date: "2024-09-13", count: 8 },
  { date: "2024-09-14", count: 3 },
  { date: "2024-09-15", count: 7 },
  { date: "2024-09-16", count: 10 },
  { date: "2024-09-17", count: 14 },
  { date: "2024-09-18", count: 5 },
  { date: "2024-09-19", count: 9 },
  { date: "2024-09-20", count: 12 },
  { date: "2024-09-21", count: 7 },
  { date: "2024-09-22", count: 5 },
  { date: "2024-09-23", count: 11 },
  { date: "2024-09-24", count: 6 },
  { date: "2024-09-25", count: 8 },
  { date: "2024-09-26", count: 4 },
  { date: "2024-09-27", count: 9 },
  { date: "2024-09-28", count: 13 },
  { date: "2024-09-29", count: 3 },
  { date: "2024-09-30", count: 0 },
  { date: "2024-10-01", count: 6 },
  { date: "2024-10-02", count: 8 },
  { date: "2024-10-03", count: 5 },
  { date: "2024-10-04", count: 9 },
  { date: "2024-10-05", count: 12 },
  { date: "2024-10-06", count: 7 },
  { date: "2024-10-07", count: 11 },
  { date: "2024-10-08", count: 14 },
  { date: "2024-10-09", count: 0 },
  { date: "2024-10-10", count: 8 },
  { date: "2024-10-11", count: 15 },
  { date: "2024-10-12", count: 6 },
  { date: "2024-10-13", count: 8 },
  { date: "2024-10-14", count: 3 },
  { date: "2024-10-15", count: 7 },
  { date: "2024-10-16", count: 10 },
  { date: "2024-10-17", count: 14 },
  { date: "2024-10-18", count: 5 },
  { date: "2024-10-19", count: 9 },
  { date: "2024-10-20", count: 12 },
  { date: "2024-10-21", count: 7 },
  { date: "2024-10-22", count: 5 },
  { date: "2024-10-23", count: 11 },
  { date: "2024-10-24", count: 6 },
  { date: "2024-10-25", count: 8 },
  { date: "2024-10-26", count: 4 },
  { date: "2024-10-27", count: 9 },
  { date: "2024-10-28", count: 13 },
  { date: "2024-10-29", count: 3 },
  { date: "2024-10-30", count: 10 },
  { date: "2024-11-01", count: 6 },
  { date: "2024-11-02", count: 8 },
  { date: "2024-11-03", count: 5 },
  { date: "2024-11-04", count: 9 },
  { date: "2024-11-05", count: 12 },
  { date: "2024-11-06", count: 7 },
  { date: "2024-11-07", count: 11 },
  { date: "2024-11-08", count: 14 },
  { date: "2024-11-09", count: 4 },
  { date: "2024-11-10", count: 8 },
  { date: "2024-11-11", count: 1 },
  { date: "2024-11-12", count: 7 },
  { date: "2024-11-13", count: 12 },
  { date: "2024-11-14", count: 3 },
  { date: "2024-11-15", count: 7 },
  { date: "2024-11-16", count: 10 },
  { date: "2024-11-17", count: 14 },
  { date: "2024-11-18", count: 5 },
  { date: "2024-11-19", count: 9 },
  { date: "2024-11-20", count: 12 },
  { date: "2024-11-21", count: 7 },
  { date: "2024-11-22", count: 5 },
  { date: "2024-11-23", count: 11 },
  { date: "2024-11-24", count: 6 },
  { date: "2024-11-25", count: 8 },
  { date: "2024-11-26", count: 4 },
  { date: "2024-11-27", count: 9 },
  { date: "2024-11-28", count: 13 },
  { date: "2024-11-29", count: 3 },
  { date: "2024-11-30", count: 10 },
  { date: "2024-11-31", count: 10 },
  { date: "2024-12-01", count: 6 },
  { date: "2024-12-02", count: 8 },
  { date: "2024-12-03", count: 0 },
  { date: "2024-12-04", count: 9 },
  { date: "2024-12-05", count: 12 },
  { date: "2024-12-06", count: 7 },
  { date: "2024-12-07", count: 11 },
  { date: "2024-12-08", count: 14 },
  { date: "2024-12-09", count: 4 },
  { date: "2024-12-10", count: 8 },
  { date: "2024-12-11", count: 1 },
  { date: "2024-12-12", count: 7 },
  { date: "2024-12-13", count: 21 },
];

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
  startDate.setDate(startDate.getDate() - 365);

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

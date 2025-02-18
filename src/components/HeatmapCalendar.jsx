import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { useState, useEffect, useRef } from "react";
import "./HeatmapCalendar.css";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import NotesModal from "./CommitNotesModal";

const Heatmap = ({ commits, repoCreationDate, notesEnabled }) => {
  const heatmapRef = useRef(null);

  const [showNotesModal, setShowNotesModal] = useState(false);

  useEffect(() => {
    if (!heatmapRef.current) return;

    const TOOLTIP_OPTIONS = {
      enabled: true,
      text: (timestamp, value, dayjsDate) => {
        return `${value ?? 0} commits on ${dayjsDate.format("YYYY-MM-DD")}`;
      },
    };

    const creationDate = new Date(repoCreationDate);
    const startDate = new Date(creationDate);
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);

    const monthsDiff = getMonthsDiff(startDate, maxDate);

    const dailyCounts = commits.reduce((acc, commit) => {
      const dt = parseTimestamp(commit.created_at);

      dt.setHours(0, 0, 0, 0);

      const localDayStr = formatLocalYYYYMMDD(dt);

      acc[localDayStr] = (acc[localDayStr] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(dailyCounts).map(([localDayStr, count]) => {
      const dayDate = parseLocalMidnight(localDayStr);
      return { date: dayDate, value: count };
    });

    const maxDailyCommits = Math.max(...Object.values(dailyCounts), 0);

    const cal = new CalHeatmap();
    cal.on("click", (event, date) => {
      const dateObj = new Date(date);
      console.log(dateObj);
      setShowNotesModal(true);
    });
    cal.paint(
      {
        itemSelector: heatmapRef.current,
        range: monthsDiff,
        domain: {
          type: "month",
          label: {
            text: "MMM",
            position: "top",
            textAlign: "middle",
          },
        },
        subDomain: {
          type: "ghDay",
          label: "MM-DD",
          radius: 5,
          width: 20,
          height: 20,
          showOutOfDomain: true,
          exclude: (date) => date > today,
        },
        date: {
          start: startDate,
          min: startDate,
          max: maxDate,
        },
        data: {
          source: chartData,
          type: "json",
          x: "date",
          y: "value",
          aggregator: "sum",
        },
        scale: {
          color: {
            range: ["#0D4429", "#016D32", "#26A641", "#3AD353"],
            type: "quantize",
            domain: [0, maxDailyCommits],
          },
        },
      },
      [[Tooltip, TOOLTIP_OPTIONS]]
    );

    setTimeout(() => {
      const container = heatmapRef.current?.parentNode;
      if (container) {
        container.scrollLeft = container.scrollWidth;
      }
    }, 0);

    return () => cal.destroy();
  }, [commits, repoCreationDate]);

  if (!commits || commits.length === 0) {
    return null;
  }
  return (
    <>
      <div ref={heatmapRef} />
      {showNotesModal && <NotesModal />}
    </>
  );
};

export default Heatmap;

function parseTimestamp(tsString) {
  const iso = tsString.replace(" ", "T");
  return new Date(iso);
}

function parseLocalMidnight(dayStr) {
  const [y, m, d] = dayStr.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

function formatLocalYYYYMMDD(dt) {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getMonthsDiff(startDate, endDate) {
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
}

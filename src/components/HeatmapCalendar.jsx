import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { useEffect, useRef } from "react";
import "./HeatmapCalendar.css";

const Heatmap = ({ commits, repoCreationDate }) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (!heatmapRef.current) return;

    const creationDate = new Date(repoCreationDate);
    const startDate = new Date(creationDate);
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);

    const monthsDiff = getMonthsDiff(startDate, maxDate);

    const dailyCommits = commits.reduce((acc, commit) => {
      const day = commit.created_at.slice(0, 10); // 'YYYY-MM-DD'
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
    const maxDailyCommits = Math.max(...Object.values(dailyCommits), 0);

    const cal = new CalHeatmap();
    cal.paint({
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
        width: 30,
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
        source: commits,
        type: "json",
        x: "created_at",
        y: () => 1,
        aggregator: "sum",
      },
      scale: {
        color: {
          range: ["#0D4429", "#016D32", "#26A641", "#3AD353"],
          type: "quantize",
          domain: [0, maxDailyCommits],
        },
      },
    });

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

  return <div ref={heatmapRef} />;
};

// Helper: Calculate month difference between two dates
function getMonthsDiff(startDate, endDate) {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1 // +1 so it includes the end month fully
  );
}

export default Heatmap;

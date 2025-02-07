import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { useEffect, useRef } from "react";
import "./HeatmapCalendar.css";

const Heatmap = ({ commits, repoCreationDate }) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (!heatmapRef.current) return;

    const dailyCommits = commits.reduce((acc, c) => {
      const day = c.created_at.slice(0, 10);
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const maxDailyCommits = Math.max(...Object.values(dailyCommits));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cal = new CalHeatmap();
    cal.paint({
      // integrate dark light mode here later
      // theme: "light",
      itemSelector: heatmapRef.current,
      range: 13,
      domain: {
        type: "month",
        label: { text: "MMM", position: "top", textAlign: "middle" },
      },

      //change type: "ghDay" for no gaps between months
      subDomain: {
        type: "day",
        label: "YYYY-MM-DD",
        radius: 5,
        width: 50,
        height: 40,
        showOutOfDomain: true,
        exclude: (date) => {
          const isExcluded = date.getTime() > today.getTime();
          console.log("Checking", date, "excluded?", isExcluded);
          return isExcluded;
        },
      },
      date: {
        start: "2024-02-07",
        max: today,
        min: "2024-02-07",
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
  }, [commits]);

  if (!commits || commits.length === 0) {
    return null;
  }

  return <div ref={heatmapRef}></div>;
};

export default Heatmap;

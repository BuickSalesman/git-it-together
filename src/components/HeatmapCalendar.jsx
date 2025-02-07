import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { useEffect, useRef } from "react";
import "./HeatmapCalendar.css";

const Heatmap = ({ commits, repoCreationDate }) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (!heatmapRef.current) return;
    const cal = new CalHeatmap();
    cal.paint({
      itemSelector: heatmapRef.current,
      range: 13,
      domain: {
        type: "month",
        label: { text: "MMM", position: "top", textAlign: "middle" },
      },

      //change type: "ghDay" for no gaps between months
      subDomain: { type: "day", label: "YYYY-MM-DD", radius: 5, width: 50, height: 40 },
      date: {
        start: "2024-02-07",
        max: new Date(),
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
          range: ["yellow", "red", "green"],
          interpolate: "hsl",
          type: "linear",
          domain: [0, 15, 30],
        },
      },
    });

    console.log(commits);
  }, [commits]);

  if (!commits || commits.length === 0) {
    return null;
  }

  return <div ref={heatmapRef}></div>;
};

export default Heatmap;

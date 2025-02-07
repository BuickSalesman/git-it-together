import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { useEffect, useRef } from "react";

const Heatmap = ({ commits, repoCreationDate }) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (!heatmapRef.current) return;
    const cal = new CalHeatmap();
    cal.paint({
      itemSelector: heatmapRef.current,
      range: 12,
      domain: {
        type: "month",
        label: { text: "MMM" },
      },

      subDomain: { type: "ghDay", label: "YYYY-MM-DD", radius: 5, width: 50, height: 40 },
      date: {
        start: "2024-02-07",
        max: new Date(),
        min: "2024-02-07",
      },
    });
  }, []);

  return <div ref={heatmapRef}></div>;
};

export default Heatmap;

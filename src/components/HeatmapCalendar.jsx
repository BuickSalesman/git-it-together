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
    });
  }, [commits, repoCreationDate]);

  return <div ref={heatmapRef}></div>;
};

export default Heatmap;

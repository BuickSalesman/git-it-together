import { useState, useEffect, useRef } from "react";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import "./HeatmapCalendar.css";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import NotesModal from "./CommitNotesModal";
import dayjs from "dayjs";

const Heatmap = ({ commits, repoCreationDate, notesEnabled }) => {
  const heatmapRef = useRef(null);

  const [showNotesModal, setShowNotesModal] = useState(false);
  const [clickedDateCommits, setClickedDateCommits] = useState([]);

  useEffect(() => {
    if (!heatmapRef.current) return;

    const TOOLTIP_OPTIONS = {
      enabled: true,
      text: (timestamp, value, dayjsDate) => {
        return `${value ?? 0} commits on ${dayjsDate.format("YYYY-MM-DD")}`;
      },
    };

    const creationDate = dayjs(repoCreationDate).startOf("day");
    const startDate = creationDate.subtract(1, "year").startOf("day");

    const endOfThisMonth = dayjs().endOf("month");

    const monthsDiff = endOfThisMonth.diff(startDate, "month") + 1;

    const dailyCounts = commits.reduce((acc, commit) => {
      const localDayStr = dayjs(commit.created_at).startOf("day").format("YYYY-MM-DD");
      acc[localDayStr] = (acc[localDayStr] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(dailyCounts).map(([dayStr, count]) => ({
      date: dayjs(dayStr).toDate(),
      value: count,
    }));

    const maxDailyCommits = Math.max(...Object.values(dailyCounts), 0);

    const cal = new CalHeatmap();

    cal.on("click", (event, clickedDate) => {
      const clickedDayStr = dayjs(clickedDate).startOf("day").format("YYYY-MM-DD");

      const matchingCommits = commits.filter((c) => {
        const commitDay = dayjs(c.created_at).startOf("day").format("YYYY-MM-DD");
        return commitDay === clickedDayStr;
      });

      setClickedDateCommits(matchingCommits);
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
          exclude: (date) => dayjs(date).isAfter(endOfThisMonth, "day"),
        },
        date: {
          start: startDate.toDate(),
          min: startDate.toDate(),
          max: endOfThisMonth.toDate(),
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

  return (
    <>
      <div ref={heatmapRef} />
      {showNotesModal && <NotesModal onClose={() => setShowNotesModal(false)} commits={clickedDateCommits} />}
    </>
  );
};

export default Heatmap;

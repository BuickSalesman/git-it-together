import { useState, useEffect, useRef } from "react";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import "./HeatmapCalendar.css";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import dayjs from "dayjs";
import NotesModal from "./CommitNotesModal";

function getStdTimezoneOffset(date = new Date()) {
  const jan = new Date(date.getFullYear(), 0, 1); // 0, 1 means jan first
  const jul = new Date(date.getFullYear(), 6, 1); // 6, 1 means july first
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

export default function Heatmap({ commits, repoCreationDate }) {
  const heatmapRef = useRef(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [clickedDate, setClickedDate] = useState("");
  const [clickedDateCommits, setClickedDateCommits] = useState([]);

  useEffect(() => {
    if (!heatmapRef.current) return;

    const dailyCounts = commits.reduce((acc, commit) => {
      const localDayStr = dayjs(commit.created_at).startOf("day").format("YYYY-MM-DD");
      acc[localDayStr] = (acc[localDayStr] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(dailyCounts).map(([dayStr, count]) => ({
      date: dayjs(dayStr).toDate(),
      value: count,
    }));

    const creationDate = dayjs(repoCreationDate).startOf("month");
    const startDate = creationDate.subtract(1, "year").startOf("month");
    const endOfThisMonth = dayjs().endOf("month");
    const monthsDiff = endOfThisMonth.diff(startDate, "month") + 1;
    const maxDailyCommits = Math.max(...Object.values(dailyCounts), 0);
    const offsetInMs = getStdTimezoneOffset() * 60 * 1000;

    const cal = new CalHeatmap();

    cal.on("click", (evt, timestampMs) => {
      if (typeof timestampMs === "number") {
        const localMidnightMs = timestampMs + offsetInMs;
        const clickedDayStr = dayjs(localMidnightMs).startOf("day").format("YYYY-MM-DD");
        const matchingCommits = commits.filter((c) => {
          const cDayStr = dayjs(c.created_at).startOf("day").format("YYYY-MM-DD");
          return cDayStr === clickedDayStr;
        });
        setClickedDate(clickedDayStr);
        setClickedDateCommits(matchingCommits);
        setShowNotesModal(true);
      }
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
          label: null,
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
          afterLoadData(dataArray) {
            const results = {};
            dataArray.forEach(({ date, value }) => {
              const ms = date.getTime();
              const shiftedMs = ms - offsetInMs;
              const shiftedSec = Math.floor(shiftedMs / 1000);
              results[shiftedSec] = value;
            });
            return results;
          },
        },
        scale: {
          color: {
            range: ["#0D4429", "#016D32", "#26A641", "#3AD353"],
            type: "quantize",
            domain: [0, maxDailyCommits],
          },
        },
      },
      [
        [
          Tooltip,
          {
            enabled: true,
            text: (tsOrMs, value, dayjsDate) => {
              return `${value ?? 0} commits on ${dayjsDate.format("YYYY-MM-DD")}`;
            },
          },
        ],
      ]
    );

    const container = heatmapRef.current?.parentNode;
    let userScrolled = false;

    const scrollToRight = () => {
      if (!container || userScrolled) return;
      container.scrollLeft = container.scrollWidth;
    };

    setTimeout(scrollToRight, 0);

    const onScroll = () => {
      if (!container) return; // probably dont need this check but here just in case
      const nearRight = container.scrollWidth - container.scrollLeft - container.clientWidth < 20;
      userScrolled = !nearRight;
    };

    container?.addEventListener("scroll", onScroll);

    const onFocus = () => {
      scrollToRight();
    };

    return () => {
      cal.destroy();
      container?.removeEventListener("scroll", onScroll);
      window.removeEventListener("focus", onFocus);
    };
  }, [commits, repoCreationDate]);

  return (
    <>
      <div ref={heatmapRef} />
      {showNotesModal && (
        <NotesModal commits={clickedDateCommits} clickedDate={clickedDate} onClose={() => setShowNotesModal(false)} />
      )}
    </>
  );
}

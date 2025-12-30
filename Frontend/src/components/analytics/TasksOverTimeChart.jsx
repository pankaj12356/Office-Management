import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TasksOverTimeChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // store chart instance

  useEffect(() => {
    if (!canvasRef.current) return;

    // destroy old chart before creating new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: data.map(d => d.month),
        datasets: [{
          label: "Tasks Created",
          data: data.map(d => d.count),
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79,70,229,0.2)",
          fill: true,
          tension: 0.3
        }]
      }
    });

    // cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
}
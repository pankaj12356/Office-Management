import { useEffect } from "react";
import Chart from "chart.js/auto";

export default function TaskStatusChart({ pending, inwork, completed }) {
  useEffect(() => {
    new Chart(document.getElementById("taskStatusChart"), {
      type: "doughnut",
      data: {
        labels: ["Pending", "Inwork", "Completed"],
        datasets: [{
          data: [pending, inwork, completed],
          backgroundColor: ["#f87171", "#facc15", "#4ade80"],
        }]
      }
    });
  }, [pending, inwork, completed]);

  return <canvas id="taskStatusChart"></canvas>;
}
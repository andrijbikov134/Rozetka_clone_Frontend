import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const SalesStatisticCategory = ({localhost}) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [categoryData, setCategoryData] = useState({
    labels: [],
    values: [],
    colors: ["blue", "pink", "yellow"]
  });

  useEffect(() => {
    fetch(`${localhost}/index.php?action=getSalesByCategory`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryData({
          labels: data.labels,
          values: data.values,
          colors: ["blue", "pink", "yellow"]
        });
        drawChart(data);
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, []);

  const drawChart = (data) => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChart = new Chart(ctx,
      {
      type: "doughnut",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Продаж за категоріями",
            data: data.values,
            backgroundColor: ["blue", "pink", "yellow"],
            borderColor: ["blue", "pink", "yellow"],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true
      }
    });

    setChartInstance(newChart);
  };

  return (
    <div style={{ textAlign: "center", width: "50%", margin: "auto" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SalesStatisticCategory;

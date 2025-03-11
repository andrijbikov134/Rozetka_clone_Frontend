import { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import styles from "./SalesStatistic.module.css";

Chart.register(...registerables);

export default function SalesChart({localhost}) 
{
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("bar");

  const fetchData = async (type) => {
    try {
      const response = await fetch(`${localhost}/index.php?action=${type}`);
      const data = await response.json();
      setChartData({
        labels: data.labels,
        datasets: [{
          label: type == 'getTopProductsQuantity' ? 'Продажі, шт.' : 'Продажі, грн.',
          data: data.values,
          backgroundColor: type === "getSalesByMonth" ? "violet" : "violet",
          borderColor: type === "getSalesByMonth" ? "violet" : "violet",
          borderWidth: 1,
          
        }],
      });
      setChartType(type === "getSalesByMonth" ? "line" : "bar");
      
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  };

  useEffect(() => {
    fetchData("getTopProductsQuantity");
  }, []);

  return (
    <div className={styles.text_center}>
      <h2>Статистика продажів</h2>
      <div className={styles.buttons_container}>
        <button onClick={() => fetchData("getTopProductsQuantity")} className="btn">ТОП-10 товарів</button>
        <button onClick={() => fetchData("getSalesByMonth")} className="btn">Продажі по місяцях</button>
        <button onClick={() => fetchData("getSalesByBrand")} className="btn">Продажі по брендах</button>
      </div>
      <div style={{ width: "100%", margin: "auto" }}>
        {chartData && (chartType === "bar" ? <Bar data={chartData} /> : <Line className={styles.line} data={chartData} />)}
      </div>
    </div>
  );
}
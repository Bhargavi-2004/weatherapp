import React from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Barchart({ chartData, options }) {
  return (
    <div style={{ width: "1000px", height: "200px" }}>
      <Bar type="bar" data={chartData} options={options} />
    </div>
  );
}
export default Barchart;

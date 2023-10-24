import React from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';

function Barchart({ chartData }) {
  return (
    <div>
      <Bar type="bar" data={chartData} />
    </div>
  );
}
export default Barchart;

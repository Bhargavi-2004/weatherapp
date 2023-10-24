import React from "react";
import { Line } from "react-chartjs-2";

function Linechart({ chartData, options }) {
  return (
    <div style={{ width: "1000px", height: "200px" }}>
      <Line type="line" data={chartData} options={options} />
    </div>
  );
}

export default Linechart;

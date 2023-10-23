import React from "react";
import { Chart } from "react-chartjs-2";
function Barchart() {
  const data = {
    labels: ["Red", "Green", "Blue"],
    datasets: [
      {
        label: "My Dataset",
        data: [10, 20, 30],
        backgroundColor: ["red", "green", "blue"],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "My Bar Chart",
    },
  };

  return (
    <div>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}
export default Barchart;
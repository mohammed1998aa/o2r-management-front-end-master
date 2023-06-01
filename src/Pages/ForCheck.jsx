import React from "react";
import { Pie } from "@ant-design/plots";

export default function ForCheck() {
  const data = [
    { type: "A", value: 27 },
    { type: "B", value: 25 },
    { type: "C", value: 18 },
    { type: "D", value: 15 },
    { type: "E", value: 10 },
    { type: "F", value: 5 },
  ];

  const config = {
    data,
    angleField: "value",
    colorField: "type",
    legend: {
      position: "bottom",
      itemName: {
        formatter: (val, item) => {
          const percent = item?.content?.[0]?.percent ?? 0;
          return `${val} (${(percent * 100).toFixed(2)}%)`;
        },
      },
    },
  };

  return (
    <div>
      {" "}
      <Pie {...config} />
    </div>
  );
}

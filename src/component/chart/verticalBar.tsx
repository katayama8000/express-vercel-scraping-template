import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

type Props = {
  conconalaTop10?: { category: string; count: number }[];
};

export const VerticalBar: React.FC<Props> = ({ conconalaTop10 }) => {
  const labels = conconalaTop10?.map((v) => v.category);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: conconalaTop10?.map((v) => v.count),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

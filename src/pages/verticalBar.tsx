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
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

const coconalaRank = [
  { category: "イラスト作成", count: 1105 },
  { category: "記事・Webコンテンツ作成", count: 617 },
  { category: "動画編集", count: 594 },
  { category: "その他（マネー・副業・アフィリ）", count: 470 },
  { category: "ロゴデザイン", count: 445 },
  { category: "アイコン作成", count: 388 },
  { category: "作業自動化・効率化", count: 316 },
  { category: "チラシ作成・フライヤーデザイン", count: 309 },
  { category: "その他（デザイン）", count: 299 },
  { category: "Webサイト修正・カスタム・コンサル", count: 297 },
  { category: "ホームページ作成", count: 296 },
];

const labels = coconalaRank.map((v) => v.category);

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: coconalaRank.map((v) => v.count),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    // {
    //   label: "Dataset 2",
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};

export default function App() {
  return <Bar options={options} data={data} />;
}

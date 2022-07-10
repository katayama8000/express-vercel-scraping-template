import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartData = {
  avg: number;
  category: string;
  count: number;
  month: string;
  quote_count: number;
  specified_amount: number;
  specified_avg: number;
  specified_count: number;
  specified_max: number;
  specified_min: number;
  sum: number;
};

type Props = {
  chartData: ChartData[];
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Top10",
    },
  },
};

export const LineGraph: FC<Props> = ({ chartData }) => {
  console.log(chartData);

  let monthLabelsDict: {
    [month: string]: string;
    // [month: string]: { month: string; category: string; count: number };
  } = {};

  let categoryLabelsDict: { [category: string]: string } = {};

  chartData?.forEach((v: ChartData) => {
    // monthLabelsDict[v.month] = {
    //   month: v.month,
    //   category: v.category,
    //   count: v.count,
    // };
    monthLabelsDict[v.month] = v.month;
    categoryLabelsDict[v.category] = v.category;
  });

  let monthLabels: string[] = Object.keys(monthLabelsDict).sort();
  let categoryLabels: string[] = Object.keys(categoryLabelsDict);

  const ColorCode = () => {
    var makingColorCode = "0123456789ABCDEF";
    var finalCode = "#";
    for (var counter = 0; counter < 6; counter++) {
      finalCode = finalCode + makingColorCode[Math.floor(Math.random() * 16)];
    }
    return finalCode;
  };

  let dataSetArray = categoryLabels.map((label: string) => {
    const color = ColorCode();
    return {
      label: label,
      data:
        monthLabels.map((month: string) => {
          return (
            chartData?.filter((v: ChartData) => {
              return v.month === month && v.category === label;
            })?.[0]?.count || 0
          );
        }) || [],
      borderColor: color,
      backgroundColor: `${color}80`,
    };
  });

  const labels = [...monthLabels];

  // const monthArray = chartData?.map((data) => data.month) || [];
  // let monthLabelsDict: { [month: string]: string } = {};
  // monthArray.forEach((v: string) => {
  //   monthLabelsDict[v] = v;
  // });
  // let monthLabels: string[] = Object.keys(monthLabelsDict);

  // const labels = [...monthLabels];

  // const categoryArray = chartData?.map((data) => data.category) || [];
  // let categoryLabelsDict: { [month: string]: string } = {};
  // categoryArray.forEach((v: string) => {
  //   categoryLabelsDict[v] = v;
  // });
  // let categoryLabels: string[] = Object.keys(categoryLabelsDict);

  // console.log(categoryLabels);

  const data = {
    labels,
    datasets:
      dataSetArray.length !== 0
        ? dataSetArray
        : [
            {
              label: "サンプル",
              data: [0],
              borderColor: "#CCCCCC",
              backgroundColor: `#CCCCCC80`,
            },
          ],
  };
  return <Line options={options} data={data} />;
};

import { useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { Button } from "src/lib/mantine";
import { LoadingOverlay } from "@mantine/core";
//component
import { VerticalBar } from "src/component/chart/verticalBar";
import { LineGraph } from "src/component/chart/lineGraph";

type coconalaType = {
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

const Home: NextPage = () => {
  const [top10, setTop10] = useState<{ category: string; count: number }[]>();
  const [chartData, setChartData] = useState<coconalaType[]>();
  const [loadingFlag, setLoadnigFlag] = useState<boolean>(false);

  const handleClick = async () => {
    setLoadnigFlag(true);
    const coconalaRank = await axios.get(
      "https://coconala-requests-checker.vercel.app/1f63a122/rank/"
    );

    if (coconalaRank.data.status === 200) {
      //すべてのデータ
      const AllData = coconalaRank.data.items;
      getRankTop10(AllData);
    }
    setLoadnigFlag(false);
  };

  let obj: { category: string; count: number[] }[] = [];

  const getRankTop10 = (AllData: coconalaType[]) => {
    //ひと月のデータ
    const data = AllData.filter((v: { month: string }) => v.month == "2022-07");
    //{ category: v.category, count: 0 }の配列を作成
    let array: { category: string; count: number }[] = [];
    data.forEach((v: { category: string }) => {
      array.push({ category: v.category, count: 0 });
    });
    //categoryが同じならcountを加算
    array.forEach((v) => {
      AllData?.forEach((v2: { category: string; count: number }) => {
        if (v.category === v2.category) {
          v.count += v2.count;
        }
      });
    });
    //オブジェクトの昇順ソート
    let result = array.sort((a, b) => {
      return a.count > b.count ? -1 : 1;
    });
    result = result.slice(0, 10);
    setTop10(result);
    const chartData = AllData.filter(
      (v: { month: string; category: string }) =>
        ["2022-04", "2022-05", "2022-06", "2022-07"].includes(v.month) &&
        result
          .map((v: { count: number; category: string }) => v.category)
          .includes(v.category)
    );
    console.log(chartData);
    setChartData(chartData);
  };

  return (
    <div className="p-20">
      <LoadingOverlay
        visible={loadingFlag}
        loaderProps={{ size: "xl", variant: "dots" }}
        overlayOpacity={0.3}
      />
      <Button dent onClick={handleClick} className="mt-4 block">
        show Top 10
      </Button>
      <VerticalBar conconalaTop10={top10} />
      <LineGraph chartData={chartData!} />
    </div>
  );
};

export default Home;

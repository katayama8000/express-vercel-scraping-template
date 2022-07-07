import type { NextPage } from "next";
import { Button } from "src/lib/mantine";
import axios from "axios";
import { useState } from "react";

type coconalaDemand = {
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
  const [demand, setdemand] = useState<coconalaDemand[]>();
  const handleClick = async () => {
    const coconalaRank = await axios.get(
      "https://coconala-requests-checker.vercel.app/1f63a122/rank/"
    );
    console.log(coconalaRank.data.status);
    if (coconalaRank.data.status === 200) {
      console.log(coconalaRank.data.items.filter((v) => v.month == "2022-07"));

      setdemand(coconalaRank.data.items.filter((v) => v.month == "2022-07"));
    }
  };

  return (
    <div className="p-20">
      <Button dent onClick={handleClick} className="mt-4 block">
        Click me!
      </Button>
      <div>
        {demand?.map((item, index) => {
          return <div key={index}>{item.category}</div>;
        })}
      </div>
    </div>
  );
};

export default Home;

import { useMemo } from "react";
import { billTypeToName } from "../../contants";
import Icon from "../Icon";
import { useState } from "react";

const DailyItem = ({date,billList}) => {
  const dayResult = useMemo(() => {
    const pay = billList 
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = billList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [billList]);

  const [ visible, setVisible ] = useState(false)

  return (
    <div className="py-3 px-3 mt-3 rounded-lg shadow-lg space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{date}</span>
        <svg
          onClick={() => setVisible(!visible)}
          t="1702725769798"
          className="icon transition duration-500 ease-in-out"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1593"
          width={18}
          height={18}
        >
          <path
            d="M680.1408 414.976c9.9328-8.704 24.2176-6.656 31.8976 4.608a27.8016 27.8016 0 0 1-4.096 35.84l-172.032 149.76a35.6352 35.6352 0 0 1-47.8208 0l-172.032-149.7088a27.8016 27.8016 0 0 1-4.096-35.9424c7.68-11.1616 22.016-13.2096 31.8976-4.608L512 561.3056l168.1408-146.2784z"
            fill="#17232B"
            p-id="1594"
          ></path>
        </svg>
      </div>
      <div className="flex justify-between items-center space-x-2">
        <span>支出{dayResult.pay}</span><span>收入{dayResult.income}</span><span>结余{dayResult.total}</span>
      </div>
      { visible && billList.map(item => {
        return <div key={item.id} className="pt-2 flex justify-between border-t">
          <div className="flex items-center space-x-1">
            <Icon type={item.useFor} />
            <span>{billTypeToName[item.useFor]}</span>
          </div>
          <span>{item.money.toFixed(2)}</span>
        </div>
      })}
    </div>
  );
};

export default DailyItem;

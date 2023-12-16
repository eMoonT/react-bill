import { NavBar, DatePicker } from "antd-mobile";
import { useState } from "react";
import dayjs from "dayjs";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useEffect } from "react";
import DailyItem from "../../components/DailyItem";

const Month = () => {
  const [dateVisible, setDateVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  const { billList } = useSelector((state) => state.bill);

  const groupMonth = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  const [currentMonthList, setCurrenMonthList] = useState([]);

  const monthResult = useMemo(() => {
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [currentMonthList]);

  useEffect(() => {
    const currentDate = dayjs(new Date()).format("YYYY-MM");
    if (groupMonth[currentDate]) {
      setCurrenMonthList(groupMonth[currentDate]);
    }
  }, [groupMonth]);

  const groupDay = useMemo(() => {
    const groupData=  _.groupBy(currentMonthList, (item) => dayjs(item.date).format("YYYY-MM-DD"));
    const key = Object.keys(groupData)
    return {
      groupData,
      key
    }
  }, [currentMonthList]);

  const onConfirm = (val) => {
    setDateVisible(false);
    const formatDate = dayjs(val).format("YYYY-MM");
    setCurrentDate(formatDate);
    if (groupMonth[formatDate]) {
      setCurrenMonthList(groupMonth[formatDate]);
    } else {
      setCurrenMonthList([]);
    }
  };

  return (
    <div>
      <NavBar backArrow={false} className="fixed top-0 inset-x-0">
        <div>月度账单</div>
      </NavBar>
      <div className="content fixed top-[50px] inset-x-0 px-2 bg-gray-100">
        <div className="header px-3 py-6 flex flex-col space-y-5 bg-yellow-300 rounded-lg shadow-xl">
          <div className="date flex items-center">
            <span onClick={() => setDateVisible(true)} className="text-lg">
              {currentDate + ""}月账单
            </span>
            <svg
              t="1702725769798"
              className="icon"
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
          <div className="totalInfo flex justify-between space-x-16">
            <div className="flex flex-col space-y-1">
              <span className="font-semibold">{monthResult.pay}</span>
              <span>支出</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-semibold">{monthResult.income}</span>
              <span>收入</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-semibold">{monthResult.total}</span>
              <span>结余</span>
            </div>
          </div>
          <DatePicker
            title="记账日期"
            visible={dateVisible}
            precision="month"
            max={new Date()}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
          />
        </div>
        {
          groupDay.key.map((key) => {
            return <DailyItem key={key} date={key} billList={groupDay.groupData[key]}/>
          })
        }
      </div>
    </div>
  );
};

export default Month;

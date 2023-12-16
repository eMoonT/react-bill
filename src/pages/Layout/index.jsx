import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchBillList } from "../../store/modules/billStore";
import {
  AddCircleOutline,
  BillOutline,
  CalculatorOutline,
} from "antd-mobile-icons";
import { TabBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch]);

  const tabs = [
    {
      key: "/",
      title: "月度账单",
      icon: <BillOutline />,
    },
    {
      key: "/new",
      title: "记账",
      icon: <AddCircleOutline />,
    },
    {
      key: "/year",
      title: "年度账单",
      icon: <CalculatorOutline />,
    },
  ];

  const navigate = useNavigate()
  const switchChange = (path) => {
    navigate(path)
  }

  return (
    <div className="w-full h-full">
      <div className="w-full fixed bottom-[55px] inset-x-0">
        <Outlet />
      </div>
      <TabBar onChange={(path) => switchChange(path)} className="w-full fixed bottom-0 inset-x-0">
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default Layout;

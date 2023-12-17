import { NavBar,Button,DatePicker,Input } from "antd-mobile";
import classNames from "classnames";
import Icon from "../../components/Icon";
import dayjs from "dayjs";
import { billListData } from "../../contants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBillList } from "../../store/modules/billStore";
import { useDispatch } from "react-redux";

const New = () => {
  const navigate = useNavigate()
  const [ dateVisible, setDateVisible ] = useState(false)
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const onConfirm = (value) => {
    setDateVisible(false)
    setDate(dayjs(value).format('YYYY-MM-DD'))
  }
  const [billType, setBillType] = useState('pay')

  const [ useFor, setUseFor ] = useState("")

  const [money,setMoney] = useState(0)

  const changeMoney = (value) => {
    setMoney(value)
  }

  const dispatch = useDispatch()
  const saveBill = () => {
    const bill = {
      date,
      type: billType,
      useFor,
      money: billType === 'pay' ? -money : +money
    }
    dispatch(addBillList(bill))
    navigate(-1)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header bg-green-300">
        <div className="kaType pt-3 pb-2 flex justify-center space-x-2">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected':'')}
            onClick={() => setBillType("pay")}
          >
            支出
          </Button>
          <Button
            shape="rounded"
            className={classNames(billType === 'income' ? 'selected':'')}
            onClick={() => setBillType("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper py-3 flex justify-center items-center">
          <div className="kaForm flex items-center">
            <div className="date py-1 px-1 rounded-md flex items-center fixed left-7 space-x-1 bg-green-primary">
              <Icon type="calendar" className="icon" />
              <span
                className="text"
                onClick={() => setDateVisible(true)}
              >
                {date}
              </span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={onConfirm}
                onCancel={() => setDateVisible(false)}
              />
            </div>
            <div className="kaInput flex-1 justify-center items-center">
              <Input
                className="input input-bg"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={changeMoney}
              />
              <span className="iconYuan fixed right-6 top-[128px] text-lg">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map((item) => {
          return (
            <div className="kaType py-3 px-1" key={item.type}>
              <div className="title text-gray-600">{item.name}</div>
              <div className="list px-3 py-3 flex items-center space-x-6">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames(
                        "item",'text-center','flex','flex-col','items-center',
                        useFor === item.type ? "active" : ""
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns flex items-center justify-center">
        <Button className="btn save w-[200px] bg-green-primary" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;

import { useEffect, useState, useRef } from "react";
import { ArrowDown } from "@zarm-design/icons";
import BillItem from "@/components/BIllItem";
import PopupType from "@/components/PopupType";
import PopupDate from "@/components/PopupDate";
import PopupAddBill from "@/components/PopupAddBill";
import CustomIcon from "@/components/CustomIcon";
import { Pull, Loading } from "zarm";
import dayjs from "dayjs";
import { get, REFRESH_STATE, LOAD_STATE } from "@/utils";
import s from "./style.module.less";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(dayjs().format("YYYY-MM")); // 当前筛选时间
  const [page, setPage] = useState(1); // 分页
  const [billList, setBillList] = useState([]); // 账单列表
  const [totalPage, setTotalPage] = useState(1); // 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态

  const typeRef = useRef(); // 账单类型 ref
  const [currentSelect, setCurrentSelect] = useState({}); // 当前筛选类型
  const monthRef = useRef(); // 月份筛选 ref

  const addRef = useRef(); // 添加账单 ref

  const [totalExpense, setTotalExpense] = useState(0); // 总支出
  const [totalIncome, setTotalIncome] = useState(0); // 总收入

  useEffect(() => {
    getBillList(); //init
    console.log(billList);
  }, [page, currentSelect, currentTime]);

  const getBillList = async () => {
    const { data } = await get(
      `/api/bill/list?date=${currentTime}&type_id=${
        currentSelect.id || "all"
      }&page=${page}&page_size=5`
    );
    console.log(data);
    if (page == 1) {
      setBillList(data.list);
    } else {
      setBillList(billList.concat(data.list));
    }
    setTotalExpense(data.totalExpense.toFixed(2));
    setTotalIncome(data.totalIncome.toFixed(2));
    setTotalPage(data.totalPage);
    setLoading(LOAD_STATE.success);
    setRefreshing(REFRESH_STATE.success);
  };

  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    if (page != 1) {
      setPage(1);
    } else {
      getBillList();
    }
  };

  const loadData = () => {
    console.log("tryLoad");
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading);
      console.log("Loading");
      setPage(page + 1);
    }
  };

  // 添加账单弹窗
  const toggle = () => {
    typeRef.current && typeRef.current.show();
  };

  // 筛选类型
  const select = (item) => {
    setRefreshing(REFRESH_STATE.loading);
    // 触发刷新列表，将分页重制为 1
    setPage(1);
    setCurrentSelect(item);
  };

  // 选择月份弹窗
  const monthToggle = () => {
    monthRef.current && monthRef.current.show();
  };

  // 筛选月份
  const selectMonth = (item) => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentTime(item);
  };

  const addToggle = () => {
    addRef.current && addRef.current.show();
  };

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span className={s.expense}>
            总支出：<b>¥ {totalExpense}</b>
          </span>
          <span className={s.income}>
            总收入：<b>¥ {totalIncome}</b>
          </span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left} onClick={toggle}>
            <span className={s.title}>
              {currentSelect.name || "全部类型"}
              <ArrowDown className={s.arrow} />
            </span>
          </div>
          <div className={s.right} onClick={monthToggle}>
            <span className={s.time}>{currentTime}</span>
            <ArrowDown className={s.arrow} />
          </div>
        </div>
      </div>
      <div className={s.contentWrap}>
        {billList.length ? (
          <Pull
            animationDuration={400}
            stayTime={400}
            refresh={{
              state: refreshing,
              handler: refreshData,
            }}
            load={{
              state: loading,
              distance: 200,
              handler: loadData,
              render: (loadState) => {
                const cls = "custom-control";
                switch (loadState) {
                  case LOAD_STATE.loading:
                    return (
                      <div className={cls}>
                        <Loading type="spinner" />
                      </div>
                    );
                  case LOAD_STATE.failure:
                    return <div className={cls}>加载失败</div>;
                  case LOAD_STATE.complete:
                    return <div className={cls}>我是有底线的</div>;
                }
              },
            }}
          >
            {billList.map((item, index) => (
              <BillItem bill={item} key={index} />
            ))}
          </Pull>
        ) : null}
      </div>
      <PopupType ref={typeRef} onSelect={select} />
      <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} />
      <div className={s.add} onClick={addToggle}>
        <CustomIcon type="tianjia" />
      </div>
      <PopupAddBill ref={addRef} onReload={refreshData} />
    </div>
  );
}

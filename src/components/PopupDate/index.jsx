// PopupDate/index.jsx
import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { Popup, DatePicker } from "zarm";
import dayjs from "dayjs";

const type = {
  month: ["year", "month"],
  day: ["year", "month", "day"],
};

const PopupDate = forwardRef(function PopupDate(
  { onSelect, mode = "date" },
  ref
) {
  const [show, setShow] = useState(false);
  const [now, setNow] = useState(new Date());
  //const [type, setType] = useState(["year", "month", "day"]);

  const choseMonth = (item) => {
    setNow(item);
    setShow(false);
    if (mode == "month") {
      onSelect(dayjs(item).format("YYYY-MM"));
    } else if (mode == "date") {
      onSelect(dayjs(item).format("YYYY-MM-DD"));
    }
  };

  if (ref) {
    ref.current = {
      show: () => {
        setShow(true);
      },
      close: () => {
        setShow(false);
      },
    };
  }
  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div>
        <DatePicker
          visible={show}
          value={now}
          columnType={type[mode]}
          type={mode}
          onConfirm={choseMonth}
          onCancel={() => setShow(false)}
        />
      </div>
    </Popup>
  );
});

PopupDate.propTypes = {
  mode: PropTypes.string, // 日期模式
  onSelect: PropTypes.func, // 选择后的回调
};

export default PopupDate;

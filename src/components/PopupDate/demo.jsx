import { useReducer } from "react";
import { List, Button, DatePicker, Toast } from "zarm";

const initialValue = {
  yearMonth: {
    title: "年月",
    props: {
      columnType: ["year", "month"],
    },
  },
};

const reducer = (state, action) => {
  const { type, key, value } = action;

  const item = state[key];
  const props = item?.props;

  switch (type) {
    case "visible":
      return {
        ...state,
        [key]: {
          ...item,
          props: {
            ...props,
            visible: !props?.visible,
          },
        },
      };

    case "value":
      return {
        ...state,
        [key]: {
          ...item,
          props: {
            ...props,
            value,
          },
        },
      };

    default:
  }
};

const Demo = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const setValue = (key, value) => {
    dispatch({ type: "value", key, value });
  };

  const toggle = (key) => {
    dispatch({
      type: "visible",
      key,
    });
  };

  return (
    <List>
      {Object.entries(state).map(([key, item], index) => (
        <div key={key}>
          <List.Item
            title={item.title}
            suffix={
              <Button size="xs" onClick={() => toggle(key)}>
                选择
              </Button>
            }
          />
          <DatePicker
            {...item.props}
            onChange={(value, items) =>
              console.log("DatePicker onChange", key, value, items)
            }
            onConfirm={(value, items) => {
              setValue(key, value);
              toggle(key);
              Toast.show(value.toLocaleString());
              console.log("DatePicker onConfirm", key, value, items);
            }}
            onCancel={() => toggle(key)}
          />
        </div>
      ))}
    </List>
  );
};
export default Demo;

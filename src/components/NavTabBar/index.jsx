import { PropTypes } from "prop-types";
import { useState } from "react";
import { TabBar, Affix } from "zarm";
import CustomIcon from "../CustomIcon";
import { useNavigate, useLocation } from "react-router-dom";

const NavTabBar = ({ showNav }) => {
  const [activeKey, setActiveKey] = useState(useLocation().pathname);
  const navigateTo = useNavigate();
  const changeTab = (path) => {
    setActiveKey(path);
    navigateTo(path);
  };
  return showNav ? (
    <Affix offsetBottom={0}>
      <TabBar activeKey={activeKey} onChange={changeTab}>
        <TabBar.Item
          itemKey="/"
          title="账单"
          icon={<CustomIcon type="zhangdan" />}
        />
        <TabBar.Item
          itemKey="/data"
          title="统计"
          icon={<CustomIcon type="tongji" />}
        />
        <TabBar.Item
          itemKey="/user"
          title="我的"
          icon={<CustomIcon type="wode" />}
        />
      </TabBar>
    </Affix>
  ) : null;
};
NavTabBar.propTypes = {
  showNav: PropTypes.bool,
};
export default NavTabBar;

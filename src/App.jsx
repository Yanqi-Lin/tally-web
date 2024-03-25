import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import routes from "@/router";
import { ConfigProvider } from "zarm";
import zhCN from "zarm/lib/config-provider/locale/zh_CN";
import "./App.css";
import NavTabBar from "@/components/NavTabBar";

export default function App() {
  const location = useLocation();
  const { pathname } = location;
  const needNav = ["/", "/data", "/user"];
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setShowNav(needNav.includes(pathname));
  }, [pathname]);

  //也可以使用useMemo钩子
  //const showNav = useMemo(() => needNav.includes(pathname), [pathname])

  return (
    <div className="app">
      <ConfigProvider primaryColor={"#007fff"} locale={zhCN}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </ConfigProvider>
      <NavTabBar showNav={showNav} />
    </div>
  );
}

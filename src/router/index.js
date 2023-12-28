import Home from "@/container/Home";
import Data from "@/container/Data";
import Detail from "@/container/Detail";
import User from "@/container/User";
import Login from "@/container/Login";
import UserInfo from "@/container/UserInfo";
import Account from "@/container/Account";
import About from "@/container/About";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/data",
    component: Data,
  },
  {
    path: "/user",
    component: User,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/detail",
    component: Detail,
  },
  {
    path: "/userInfo",
    component: UserInfo,
  },
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/about",
    component: About,
  },
];

export default routes;

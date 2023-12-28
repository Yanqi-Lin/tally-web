import React, { useState, useEffect } from "react";
import { get } from "@/utils";
import { Button, List } from "zarm";
import s from "./style.module.less";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");
  const [signature, setSignature] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const { data } = await get("/api/user/get_userinfo");
    console.log(data);
    setUser(data);
    setAvatar(data.avatar);
    setSignature(data.signature);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    navigateTo("/login");
  };

  return (
    <div className={s.user}>
      <div className={s.head}>
        <div className={s.info}>
          <span>昵称：{user.username || "暂无"}</span>
          <span>
            <img
              style={{
                width: 30,
                height: 30,
                verticalAlign: "-10px",
                paddingRight: "4px",
              }}
              src="//s.yezgea02.com/1615973630132/geqian.png"
              alt=""
            />
            <b>{user.signature || ""}</b>
          </span>
        </div>
        <img
          className={s.avatar}
          style={{ width: 60, height: 60, borderRadius: 8 }}
          src={user.avatar || "//s.yezgea02.com/1624959897466/avatar.jpeg"}
          alt=""
        />
      </div>
      <div className={s.content}>
        <List>
          <List.Item
            hasArrow
            title="修改信息"
            prefix={
              <img
                style={{ width: 20, verticalAlign: "-7px" }}
                src="//s.yezgea02.com/1615974766264/gxqm.png"
                alt=""
              />
            }
            onClick={() => {
              navigateTo("/userInfo");
            }}
          />
          <List.Item
            hasArrow
            title="重置密码"
            prefix={
              <img
                style={{ width: 20, verticalAlign: "-7px" }}
                src="//s.yezgea02.com/1615974766264/zhaq.png"
                alt=""
              />
            }
            onClick={() => {
              navigateTo("/account");
            }}
          />
          <List.Item
            hasArrow
            title="关于我们"
            prefix={
              <img
                style={{ width: 20, verticalAlign: "-7px" }}
                src="//s.yezgea02.com/1615975178434/lianxi.png"
                alt=""
              />
            }
            onClick={() => {
              navigateTo("/about");
            }}
          />
        </List>
      </div>
      <Button className={s.logout} shadow theme="danger" onClick={logout}>
        退出登录
      </Button>
    </div>
  );
}

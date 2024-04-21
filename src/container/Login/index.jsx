import { useEffect, useState } from "react";
import s from "./style.module.less";
import { List, Input, Checkbox, Button, Tabs, Toast } from "zarm";
import CustomIcon from "@/components/CustomIcon";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { post } from "@/utils";

const { Panel } = Tabs;

export default function Login() {
  //标签查询表
  const typeCheck = {
    register: 0,
    login: 1,
  };
  const [type, setType] = useState(typeCheck["login"]);
  const [username, setUsername] = useState(""); // 账号
  const [password, setPassword] = useState(""); // 密码
  const [verify, setVerify] = useState(""); // 验证码
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    loadCaptchaEnginge(4, "blue", "white");
  }, []);

  const onSubmitRegister = async () => {
    if (!username) {
      Toast.show("请输入账号");
      return;
    }
    if (!password) {
      Toast.show("请输入密码");
      return;
    }
    if (!verify) {
      Toast.show("请输入验证码");
      return;
    }
    if (validateCaptcha(verify) == false) {
      Toast.show("验证码错误");
      return;
    }
    if (!checked) {
      Toast.show("请勾选条款");
      return;
    }
    try {
      const { data } = await post("/api/user/register", {
        username,
        password,
      });
      Toast.show("注册成功");
      setType(typeCheck["login"]);
    } catch (error) {
      Toast.show(error.msg);
      setUsername("");
      setPassword("");
      loadCaptchaEnginge(4, "blue", "white");
    }
  };

  const onSubmitLogin = async () => {
    if (!username) {
      Toast.show("请输入账号");
      return;
    }
    if (!password) {
      Toast.show("请输入密码");
      return;
    }
    try {
      const { data } = await post("/api/user/login", {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      Toast.show(error.msg);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className={s.auth}>
      <div
        className={s.head}
        // style={{
        //   height: "288px",
        //   marginBottom: "50px",
        //   background:
        //     "no-repeat center/120% url('https://s.yezgea02.com/1616032174786/cryptocurrency.png')",
        // }}
      ></div>
      <Tabs value={type} onChange={setType}>
        <Panel title="注册">
          <div className={s.form}>
            <List bordered={false}>
              <List.Item prefix={<CustomIcon type="zhanghao" />}>
                <Input
                  clearable
                  type="text"
                  placeholder="请输入账号"
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                />
              </List.Item>
              <List.Item
                prefix={<CustomIcon type="mima" />}
                title=""
                // description="最少8个字符，由英文字母、数字组成"
              >
                <Input
                  clearable
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </List.Item>
              <List.Item prefix={<CustomIcon type="mima" />} title="">
                <Input
                  clearable
                  type="text"
                  placeholder="请输入验证码"
                  onChange={e => setVerify(e.target.value)}
                />
                <div className={s.canvasTemplate}>
                  <LoadCanvasTemplate reloadText="换一个验证码" />
                </div>
              </List.Item>
              <List.Item>
                <Checkbox checked={checked} onChange={setChecked} />
                <label className={s.label}>
                  <span>同意</span>
                  <a className={s.tiaokuan} href="javascript:void(0)">
                    《掘掘手札条款》
                  </a>
                </label>
              </List.Item>
              <Button block theme="primary" onClick={onSubmitRegister}>
                注册
              </Button>
            </List>
          </div>
        </Panel>
        <Panel title="登录">
          <div className={s.form}>
            <List bordered={false}>
              <List.Item prefix={<CustomIcon type="zhanghao" />} title="">
                <Input
                  clearable
                  placeholder="请输入账号"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </List.Item>
              <List.Item
                prefix={<CustomIcon type="mima" />}
                title=""
                //description="最少8个字符，由英文字母、数字组成"
              >
                <Input
                  clearable
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </List.Item>
              <Button
                block
                theme="primary"
                className={s.loginBtn}
                onClick={onSubmitLogin}
              >
                登录
              </Button>
            </List>
          </div>
        </Panel>
      </Tabs>
    </div>
  );
}

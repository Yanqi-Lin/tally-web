// import { createForm, formShape } from "rc-form";
import { useForm, Controller } from "react-hook-form";
import { post } from "@/utils";
import { Input, Button, Toast, List } from "zarm";
import Header from "@/components/Header";
import s from "./style.module.less";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Account = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) navigateTo("/login");
  }, []);

  const onSubmit = async (data) => {
    if (!errors.code) {
      if (data.newpass != data.newpass2) {
        Toast.show("新密码输入不一致");
        return;
      }
      await post("/api/user/modify_pass", {
        old_pass: data.oldpass,
        new_pass: data.newpass,
        new_pass2: data.newpass2,
      });
      Toast.show("修改成功");
    }
  };

  return (
    <>
      <Header title="修改密码" />
      <div className={s.account}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <List>
            <List.Item title="原密码">
              <Controller
                name="oldpass"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    clearable
                    type="password"
                    placeholder="请输入原密码"
                    {...field}
                  />
                )}
              />
            </List.Item>
            <List.Item title="新密码">
              <Controller
                name="newpass"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    clearable
                    type="password"
                    placeholder="请输入新密码"
                    {...field}
                  />
                )}
              />
            </List.Item>
            <List.Item title="再次输入">
              <Controller
                name="newpass2"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    clearable
                    type="password"
                    placeholder="请再次输入新密码"
                    {...field}
                  />
                )}
              />
            </List.Item>
          </List>
          <Button className={s.btn} block theme="primary" htmlType="submit">
            提交
          </Button>
        </form>
      </div>
    </>
  );
};

export default Account;

//import React from "react";
import Header from "@/components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import s from "./style.module.less";

const About = () => {
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) navigateTo("/login");
  }, []);

  return (
    <>
      <Header title="关于我们" />
      <div className={s.about}>
        <h2>关于项目</h2>
        <article>阿Lam的第一个全栈项目，希望能能做到小而美!</article>
      </div>
    </>
  );
};

export default About;

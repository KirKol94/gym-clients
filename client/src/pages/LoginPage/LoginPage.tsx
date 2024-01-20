import { LoginForm } from "@/features/LoginForm";
import classes from "./LoginPage.module.scss";
import cx from "classix";

export const LoginPage = () => {
  const className = cx("login__container", classes.page);

  return (
    <>
      <div className={className}>
        <header></header>
        <LoginForm />
      </div>
    </>
  );
};

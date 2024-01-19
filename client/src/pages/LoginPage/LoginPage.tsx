import { LoginForm } from "@/features/LoginForm";
import classes from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <div className={classes.page}>
      <header></header>
      <LoginForm />
      <footer></footer>
    </div>
  );
};

import { LoginForm } from "@/features/LoginForm";
import classes from "./LoginPage.module.scss";

interface LoginPageProps {}

export const LoginPage = ({}: LoginPageProps) => {
  return (
    <div className={classes.page}>
      <header></header>
      <LoginForm />
      <footer></footer>
    </div>
  );
};

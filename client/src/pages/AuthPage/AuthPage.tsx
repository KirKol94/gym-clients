import { AuthForm, AuthFormType } from "@/features/AuthForm";

import classes from "./AuthPage.module.scss";

interface AuthPageProps {
  type: AuthFormType;
}

export const AuthPage = ({ type }: AuthPageProps) => {
  return (
    <div className={classes.page}>
      <header></header>

      {type === AuthFormType.LOGIN && <AuthForm type={AuthFormType.LOGIN} />}
      {type === AuthFormType.REGISTER && (
        <AuthForm type={AuthFormType.REGISTER} />
      )}

      <footer></footer>
    </div>
  );
};

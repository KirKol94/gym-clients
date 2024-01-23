import { AuthForm, AuthType } from "@/features/AuthForm";

import classes from "./AuthPage.module.scss";

interface AuthPageProps {
  type: AuthType;
}

export const AuthPage = ({ type }: AuthPageProps) => {
  return (
    <div className={classes.page}>
      <header></header>

      {type === AuthType.LOGIN && <AuthForm type={AuthType.LOGIN} />}
      {type === AuthType.REGISTER && (
        <AuthForm type={AuthType.REGISTER} />
      )}

      <footer></footer>
    </div>
  );
};

export default AuthPage;

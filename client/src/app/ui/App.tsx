import { BrowserRouter, Route } from "react-router-dom";
import "../styles/index.scss";
import { AuthPage } from "@/pages/AuthPage";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { AuthFormType } from "@/features/AuthForm";
import { HomePage } from "@/pages/HomePage";

export const App = () => {
  return (
    <BrowserRouter>
      <Route index element={<HomePage />} />
      <Route
        path={ROUTER_PATH.LOGIN}
        element={<AuthPage type={AuthFormType.LOGIN} />}
      />
      <Route
        path={ROUTER_PATH.REGISTER}
        element={<AuthPage type={AuthFormType.REGISTER} />}
      />
    </BrowserRouter>
  );
};

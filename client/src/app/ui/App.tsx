import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/index.scss";
import { AuthPage } from "@/pages/AuthPage";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { AuthFormType } from "@/features/AuthForm";
import { HomePage } from "@/pages/HomePage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path={ROUTER_PATH.LOGIN}
          element={<AuthPage type={AuthFormType.LOGIN} />}
        />
        <Route
          path={ROUTER_PATH.REGISTER}
          element={<AuthPage type={AuthFormType.REGISTER} />}
        />
        <Route path="*" element={<>page is not found</>} />
      </Routes>
    </BrowserRouter>
  );
};

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/index.scss";
import { LoginPage } from "@/pages/LoginPage";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { HomePage } from "@/pages/HomePage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={ROUTER_PATH.LOGIN} element={<LoginPage />} />
        <Route path={ROUTER_PATH.REGISTER} element={<>register</>} />
        <Route path="*" element={<>page is not found</>} />
      </Routes>
    </BrowserRouter>
  );
};

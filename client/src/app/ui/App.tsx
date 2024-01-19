import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/index.scss";
import { Title, TitleSize } from "@/shared/ui/Title";
import { Text, TextSize } from "@/shared/ui/Text";
import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import { Button, ButtonSize } from "@/shared/ui/Button";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<>home</>} />
        <Route path="login" element={<>login</>} />
        <Route path="register" element={<>register</>} />
        <Route path="*" element={<>page is not found</>} />
      </Routes>
    </BrowserRouter>
  );
};

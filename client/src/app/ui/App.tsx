import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/index.scss";
import { Title, TitleSize } from "@/shared/ui/Title";
import { Text, TextSize } from "@/shared/ui/Text";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<>home</>} />
        <Route
          path="login"
          element={
            <>
              <Title size={TitleSize.XXL}>Авторизация</Title>
              <Text size={TextSize.S}>У вас уже есть учётная запись</Text>
            </>
          }
        />
        <Route path="register" element={<>register</>} />
        <Route path="*" element={<>page is not found</>} />
      </Routes>
    </BrowserRouter>
  );
};

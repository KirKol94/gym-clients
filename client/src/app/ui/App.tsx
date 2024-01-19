import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/index.scss";

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

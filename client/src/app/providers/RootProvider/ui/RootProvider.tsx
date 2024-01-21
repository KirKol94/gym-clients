import { ReactNode } from "react";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const RootProvider = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

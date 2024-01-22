import { ReactNode } from "react";
import { store, persistore } from "@/app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children: ReactNode;
}

export const RootProvider = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
          {children}
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

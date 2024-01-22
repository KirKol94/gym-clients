import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthFormType } from "@/features/AuthForm";
import { Loader } from "@/shared/ui/Loader/ui/Loader";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { RootProvider } from "../providers/RootProvider";
import "../styles/index.scss";


const AuthPage = lazy(() => import("@/pages/AuthPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));

export const App = () => {
  return (
    <RootProvider>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_PATH.LOGIN}
          element={
            <Suspense fallback={<Loader />}>
              <AuthPage type={AuthFormType.LOGIN} />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_PATH.REGISTER}
          element={
            <Suspense fallback={<Loader />}>
              <AuthPage type={AuthFormType.REGISTER} />
            </Suspense>
          }
        />
        <Route path="*" element={<>page is not found</>} />
      </Routes>
    </RootProvider>
  );
};

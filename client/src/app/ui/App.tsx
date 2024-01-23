import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { userActions } from "@/entities/User";
import { AuthType } from "@/features/AuthForm";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { useAppDispatch } from "@/shared/hooks";
import { Loader } from "@/shared/ui/Loader";

import "../styles/index.scss";

const AuthPage = lazy(() => import("@/pages/AuthPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
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
            <AuthPage type={AuthType.LOGIN} />
          </Suspense>
        }
      />
      <Route
        path={ROUTER_PATH.REGISTER}
        element={
          <Suspense fallback={<Loader />}>
            <AuthPage type={AuthType.REGISTER} />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

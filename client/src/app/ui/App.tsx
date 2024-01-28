import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { userActions } from "@/entities/User";
import { AuthType } from "@/features/AuthForm";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { useAppDispatch } from "@/shared/hooks";
import { Loader, LoaderColor, LoaderSize } from "@/shared/ui/Loader";

import "../styles/index.scss";

const AuthPage = lazy(() => import("@/pages/AuthPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export const App = () => {
  console.log("hello conflict1");
  const dispatch = useAppDispatch();
  console.log("hello conflict1");

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<Loader size={LoaderSize.BIG} color={LoaderColor.BLUE}/>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path={ROUTER_PATH.LOGIN}
        element={
          <Suspense fallback={<Loader size={LoaderSize.BIG} color={LoaderColor.BLUE}/>}>
            <AuthPage type={AuthType.LOGIN} />
          </Suspense>
        }
      />
      <Route
        path={ROUTER_PATH.REGISTER}
        element={
          <Suspense fallback={<Loader size={LoaderSize.BIG} color={LoaderColor.BLUE}/>}>
            <AuthPage type={AuthType.REGISTER} />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
      <span>hello conflict</span>
    </Routes>
  );
};

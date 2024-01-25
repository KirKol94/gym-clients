import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getIsAuth } from "@/entities/User";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { useAppSelector } from "@/shared/hooks";

import clasess from "./ProfilePage.module.scss";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const isAuth = useAppSelector(getIsAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTER_PATH.LOGIN);
    }
  }, [isAuth, navigate]);

  return (
    <div className={clasess.home}>
      <p>ProfilePage</p>
    </div>
  );
};

export default ProfilePage;

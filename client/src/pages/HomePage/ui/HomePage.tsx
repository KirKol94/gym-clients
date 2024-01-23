import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cx from "classix";

import { getIsAuth } from "@/entities/User";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { useAppSelector } from "@/shared/hooks";
import { Footer } from "@/widgets/Footer";

export const HomePage = () => {
  const navigate = useNavigate();

  const isAuth = useAppSelector(getIsAuth);

  const className = cx("home__container");

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTER_PATH.LOGIN);
    }
  }, []);

  return (
    <div className={className}>
      <Footer />
    </div>
  );
};

export default HomePage;

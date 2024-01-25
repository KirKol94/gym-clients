import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Footer } from "@/widgets/Footer";
import { Sidebar } from "@/widgets/Sidebar";

import classes from "./Layout.module.scss";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") return navigate("/profile");
  }, [location.pathname, navigate]);

  return (
    <div className="layout__container">
      <div className={classes.content}>
        <Sidebar />
        <main className={classes.main}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

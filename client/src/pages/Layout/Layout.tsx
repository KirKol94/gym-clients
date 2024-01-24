import classes from "./Layout.module.scss";
import { Footer } from "@/widgets/Footer";
import { Sidebar } from "@/widgets/Sidebar";
import cx from "classix";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const className = cx("layout__container", classes.layout);

  return (
    <div className={className}>
      <div className={classes.content}>
        <Sidebar />
        <main className={classes.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

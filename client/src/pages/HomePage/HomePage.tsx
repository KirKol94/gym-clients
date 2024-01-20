import { Footer } from "@/widgets/Footer";
import classes from "./HomePage.module.scss";
import cx from "classix";

export const HomePage = () => {
  const className = cx("home__container", classes.page);

  return (
    <div className={className}>
      <p>homepage</p>
      <Footer />
    </div>
  );
};

export default HomePage;

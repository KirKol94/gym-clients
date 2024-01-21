import { Footer } from "@/widgets/Footer";
import cx from "classix";

export const HomePage = () => {
  const className = cx("home__container");

  return (
    <div className={className}>
      <Footer />
    </div>
  );
};

export default HomePage;

import cx from "classix";

import { Footer } from "@/widgets/Footer";

export const HomePage = () => {
  const className = cx("home__container");

  return (
    <div className={className}>
      <Footer />
    </div>
  );
};

export default HomePage;

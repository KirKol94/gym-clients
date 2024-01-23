import cx from "classix";

import { Footer } from "@/widgets/Footer";
import { Sidebar } from "@/widgets/Sidebar";

export const HomePage = () => {
  const className = cx("home__container");

  return (
    <div className={className}>
      <Sidebar />
      <Footer />
    </div>
  );
};

export default HomePage;

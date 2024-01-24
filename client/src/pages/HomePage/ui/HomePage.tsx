import cx from "classix";

import { Alert } from "@/widgets/Alert";
import { Footer } from "@/widgets/Footer";

export const HomePage = () => {
  const className = cx("home__container");

  return (
    <div className={className}>
      <Alert count={0} 
            title="Контрагента ожидают в стадии “Подписание контракта”"
            alert="Подпишите контракты с контрагентами или переведите их в архивные"
            />
      <Footer />
    </div>
  );
};

export default HomePage;

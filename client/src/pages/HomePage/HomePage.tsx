import { useAppSelector } from "@/shared/hooks";
import { Title, TitleSize } from "@/shared/ui/Title";
import { Footer } from "@/widgets/Footer";
import cx from "classix";

export const HomePage = () => {
  const className = cx("home__container");
  const { name } = useAppSelector((state) => state.auth.user);

  return (
    <div className={className}>
      <Title size={TitleSize.XXL}>Привет, {name}</Title>
      <Footer />
    </div>
  );
};

export default HomePage;

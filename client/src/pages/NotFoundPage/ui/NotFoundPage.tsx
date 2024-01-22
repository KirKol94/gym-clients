import cx from "classix";
import classes from "./NotFoundPage.module.scss";
import NotFoundImg from "../assets/image/notfound.svg";
import { Title, TitleSize } from "@/shared/ui/Title";
import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";

export const NotFoundPage = () => {
  const className = cx("notfound__container", classes.page);

  return (
    <div className={className}>
      <Title className={classes.title} size={TitleSize.MAX}>
        Странца не найдена
      </Title>
      <img src={NotFoundImg} alt="Страница не найдена" />
      <div>
        <AppLink to="/" size={AppLinkSize.M}>
          На главную
        </AppLink>
      </div>
    </div>
  );
};

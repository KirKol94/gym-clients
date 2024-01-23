import cx from "classix";
import classes from "./NotFoundPage.module.scss";
import NotFoundImg from "../assets/image/notfound.svg?react";
import { Title, TitleSize } from "@/shared/ui/Title";
import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import { ROUTER_PATH } from "@/shared/const/path/PATH";

export const NotFoundPage = () => {
  const className = cx("notfound__container", classes.page);

  return (
    <div className={className}>
      <Title className={classes.title} size={TitleSize.XXL}>
        Странца не найдена
      </Title>
      <NotFoundImg />
      <div>
        <AppLink to={ROUTER_PATH.HOME} size={AppLinkSize.M}>
          На главную
        </AppLink>
      </div>
    </div>
  );
};

import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import { Text, TextSize } from "@/shared/ui/Text";

import classes from "./Footer.module.scss";

export const Footer = () => {
  const data = [
    {
      title: "Техподдержка",
      link: "#",
    },
    {
      title: "Построено на OpenCRM",
      link: "#",
    },
  ];

  return (
    <footer className={classes.footer}>
      <Text size={TextSize.S}>©2020 Company Name</Text>
      <div className={classes.links}>
        {data.map((el, index) => (
          <AppLink to={el.link} size={AppLinkSize.S} key={el.title + index}>
            {el.title}
          </AppLink>
        ))}
      </div>
    </footer>
  );
};

export default Footer;

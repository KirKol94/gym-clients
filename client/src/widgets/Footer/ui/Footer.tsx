import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import classes from "./footer.module.scss";
import { Text, TextSize } from "@/shared/ui/Text";

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
    <div className={classes.footer}>
      <Text size={TextSize.S}>©2020 Company Name</Text>
      <div className={classes.links}>
        {data.map((el, index) => (
          <AppLink to={el.link} size={AppLinkSize.S} key={index}>
            {el.title}
          </AppLink>
        ))}
      </div>
    </div>
  );
};

export default Footer;

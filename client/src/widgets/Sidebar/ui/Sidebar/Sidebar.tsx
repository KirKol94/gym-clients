import classes from "./Sidebar.module.scss";
import Logo from "../../assets/image/Logo.svg";
import Avatar from "../../assets/image/Avatar.svg";
import Agent from "../../assets/image/Agent.svg";
import Contract from "../../assets/image/Contract.svg";
import Deals from "../../assets/image/Deals.svg";
import Setting from "../../assets/image/Settings.svg";
import Users from "../../assets/image/Users.svg";
import Group from "../../assets/image/Group.svg";
import { useState } from "react";
import SidebarItem from "../SidebarItem/SidebarItem";

const user = { title: "Иван Иванов", link: Avatar, type: "user" };

const sidebarArr = [
  {
    title: "Пользователи",
    link: Users,
    type: "card",
  },
  {
    title: "Группы компаний",
    link: Group,
    type: "card",
  },
  {
    title: "Контрагенты",
    link: Agent,
    type: "card",
  },
  {
    title: "Контракты",
    link: Contract,
    type: "card",
  },
  {
    title: "Сделки",
    link: Deals,
    type: "card",
  },
  {
    title: "Настройки",
    link: Setting,
    type: "card",
  },
];

export const Sidebar = () => {
  const [active, setActive] = useState("");

  const handleActiveLink = (e: string): any => {
    setActive(e);
  };

  return (
    <aside className={classes.wrapper}>
      <img src={Logo} alt="Логотип" />

      <nav className={classes.links__wrapper}>
        <SidebarItem
          title={user.title}
          link={user.link}
          onClick={() => handleActiveLink(user.title)}
          className={user.title === active ? classes.active : classes.card}
        />
        <ul className={classes.cards__wrapper}>
          {sidebarArr.map((el, index) => (
            <SidebarItem
              title={el.title}
              link={el.link}
              key={el.title + index}
              onClick={() => handleActiveLink(el.title)}
              className={el.title === active ? classes.active : classes.card}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

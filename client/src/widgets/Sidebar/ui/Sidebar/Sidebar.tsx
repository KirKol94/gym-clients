import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Agent from "../../assets/image/Agent.svg";
import Avatar from "../../assets/image/Avatar.svg";
import BackArrow from "../../assets/image/Back.svg";
import Contract from "../../assets/image/Contract.svg";
import Deals from "../../assets/image/Deals.svg";
import Group from "../../assets/image/Group.svg";
import Logo from "../../assets/image/Logo.svg";
import Setting from "../../assets/image/Settings.svg";
import Users from "../../assets/image/Users.svg";
import SidebarItem from "../SidebarItem/SidebarItem";

import classes from "./Sidebar.module.scss";

// для будующих пропсов?
interface UserProps {
  title: string;
  link: string;
  to: string;
}

const user: UserProps = { title: "Иван Иванов", link: Avatar, to: "/profile" };

const sidebarArr = [
  {
    title: "Пользователи",
    link: Users,
    to: "/users",
  },
  {
    title: "Группы компаний",
    link: Group,
    to: "/group",
  },
  {
    title: "Контрагенты",
    link: Agent,
    to: "/agent",
  },
  {
    title: "Контракты",
    link: Contract,
    to: "/contract",
  },
  {
    title: "Сделки",
    link: Deals,
    to: "/deals",
  },
  {
    title: "Настройки",
    link: Setting,
    to: "/setting",
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    location.pathname === "/profile" && setActive(user.title);
  }, [location.pathname]);

  return (
    <aside className={classes.sidebar}>
      <div className={classes.logo__wrapper}>
        <img src={Logo} alt="Логотип" />
        <div className={classes.back}>
          <img src={BackArrow} />
        </div>
      </div>

      <nav className={classes.links__wrapper}>
        <SidebarItem data={user} setActive={setActive} active={active} />
        <ul className={classes.cards__wrapper}>
          {sidebarArr.map((el, index) => (
            <SidebarItem
              data={el}
              setActive={setActive}
              active={active}
              key={el.title + index}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

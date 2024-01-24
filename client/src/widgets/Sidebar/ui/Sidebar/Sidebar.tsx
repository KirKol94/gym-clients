import classes from "./Sidebar.module.scss";
import Logo from "../../assets/image/Logo.svg";
import Avatar from "../../assets/image/Avatar.svg";
import Agent from "../../assets/image/Agent.svg";
import Contract from "../../assets/image/Contract.svg";
import Deals from "../../assets/image/Deals.svg";
import Setting from "../../assets/image/Settings.svg";
import Users from "../../assets/image/Users.svg";
import Group from "../../assets/image/Group.svg";
import BackArrow from "../../assets/image/Back.svg";
import { useState } from "react";
import SidebarItem from "../SidebarItem/SidebarItem";

// для будующих пропсов?
interface UserProps {
  title: string;
  link: string;
}

const user: UserProps = { title: "Иван Иванов", link: Avatar };

const sidebarArr = [
  {
    title: "Пользователи",
    link: Users,
  },
  {
    title: "Группы компаний",
    link: Group,
  },
  {
    title: "Контрагенты",
    link: Agent,
  },
  {
    title: "Контракты",
    link: Contract,
  },
  {
    title: "Сделки",
    link: Deals,
  },
  {
    title: "Настройки",
    link: Setting,
  },
];

export const Sidebar = () => {
  const [active, setActive] = useState<string>("");

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

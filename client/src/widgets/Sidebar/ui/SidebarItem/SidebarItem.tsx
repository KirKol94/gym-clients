import { useNavigate } from "react-router-dom";
import cx from "classix";

import classes from "./SidebarItem.module.scss";

interface SidebarItemProps {
  data: { title: string; link: string; to: string };
  active: string;
  setActive: (title: string) => void;
}

const SidebarItem = ({ data, active, setActive }: SidebarItemProps) => {
  const navigate = useNavigate();

  const { title, link, to } = data;
  const className = cx(active === title ? classes.active : classes.card);

  const handeleClick = () => {
    setActive(title);
    navigate(to);
  };

  return (
    <li className={className} onClick={handeleClick}>
      <img src={link} alt={title} />
      <p>{title}</p>
    </li>
  );
};

export default SidebarItem;

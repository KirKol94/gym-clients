import cx from "classix";
import classes from "./SidebarItem.module.scss";

interface SidebarItemProps {
  data: { title: string; link: string };
  active: string;
  setActive: (title: string) => any;
}

const SidebarItem = ({ data, active, setActive }: SidebarItemProps) => {
  const { title, link } = data;
  const className = cx(active === title ? classes.active : classes.card);

  const handeleClick = () => {
    setActive(title);
  };

  return (
    <li className={className} onClick={handeleClick}>
      <img src={link} alt={title} />
      <p>{title}</p>
    </li>
  );
};

export default SidebarItem;

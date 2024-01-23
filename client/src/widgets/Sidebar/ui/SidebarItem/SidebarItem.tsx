import classes from "./SidebarItem.module.scss";

interface SidebarItemProps {
  title: string;
  link: string;
  onClick: () => string;
  className: string;
}

const SidebarItem = ({ title, link, onClick, className }: SidebarItemProps) => {
  return (
    <li className={className} onClick={onClick}>
      <img src={link} alt={title} />
      <p>{title}</p>
      <div className={classes.stick}></div>
    </li>
  );
};

export default SidebarItem;

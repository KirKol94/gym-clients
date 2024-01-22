import { ReactNode } from "react";
import classes from "./AppLink.module.scss";
import { Link } from "react-router-dom";
import cx from "classix";
import { AppLinkSize } from "./types";

interface AppLinkProps {
  to: string;
  size: AppLinkSize;
  children: ReactNode;
}

export const AppLink = ({ to, size, children }: AppLinkProps) => {
  const className = cx(
    classes.applink,
    size === AppLinkSize.S && classes.applink__s,
    size === AppLinkSize.M && classes.applink__m
  );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

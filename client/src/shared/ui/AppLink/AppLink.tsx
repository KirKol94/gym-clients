import { ReactNode } from "react";
import { Link } from "react-router-dom";
import cx from "classix";

import { AppLinkSize } from "./types";

import classes from "./AppLink.module.scss";

interface AppLinkProps {
  to: string;
  size: AppLinkSize;
  children: ReactNode;
}

export const AppLink = ({ to, size, children }: AppLinkProps) => {
  const className = cx(
    classes.applink,
    size === AppLinkSize.S && classes.applink__s
  );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

import { ReactNode } from "react";
import cx from "classix";

import { TextSize } from "./types";

import classes from "./Text.module.scss";

interface TextProps {
  size: TextSize;
  children: ReactNode;
}

export const Text = ({ size, children }: TextProps) => {
  const className = cx(classes.text, size === TextSize.S && classes.text__s);

  return <p className={className}>{children}</p>;
};

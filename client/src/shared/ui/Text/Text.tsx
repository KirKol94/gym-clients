import { ReactNode } from "react";
import classes from "./Text.module.scss";
import cx from "classix";
import { TextSize } from "./types";

interface TextProps {
  size: TextSize;
  children: ReactNode;
}

export const Text = ({ size, children }: TextProps) => {
  const className = cx(classes.text, size === TextSize.S && classes.text__s);

  return <p className={className}>{children}</p>;
};

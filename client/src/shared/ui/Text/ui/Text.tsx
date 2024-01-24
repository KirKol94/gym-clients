import { ReactNode } from "react";
import cx from "classix";

import { TextSize } from "../model/types/text";

import classes from "./Text.module.scss";

interface TextProps {
  size?: TextSize;
  children: ReactNode;
  className?: string;
}

export const Text = ({ size, children, className }: TextProps) => {
  const cls = cx(
    classes.text, 
    size === TextSize.S && classes.text__s,
    size === TextSize.M && classes.text__m,
    className
  );

  return <p className={cls}>{children}</p>;
};

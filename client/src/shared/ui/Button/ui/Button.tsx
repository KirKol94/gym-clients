import { ButtonHTMLAttributes, ReactNode } from "react";
import cx from "classix";

import { ButtonSize } from "../mode/types/button";

import classes from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSize;
  children: ReactNode;
}

export const Button = ({ size, children, ...props }: ButtonProps) => {
  const className = cx(
    classes.button,
    size === ButtonSize.M && classes.button__m,
    size === ButtonSize.S && classes.button__s,
  );

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

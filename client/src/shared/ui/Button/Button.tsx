import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";
import cx from "classix";

export enum ButtonSize {
  M = "m",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSize;
  children: ReactNode;
}

export const Button = ({ size, children, ...props }: ButtonProps) => {
  const className = cx(
    classes.button,
    size === ButtonSize.M && classes.button__m
  );

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

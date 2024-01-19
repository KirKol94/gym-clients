import { ReactNode } from "react";
import classes from "./Title.module.scss";
import cx from "classix";

export enum TitleSize {
  XXL = "xxl",
}

interface TitleProps {
  size: TitleSize;
  children: ReactNode;
}

export const Title = ({ size, children }: TitleProps) => {
  const className = cx(
    classes.title,
    size === TitleSize.XXL && classes.title__xxl
  );

  switch (size) {
    case TitleSize.XXL:
      return <h1 className={className}>{children}</h1>;
  }
};

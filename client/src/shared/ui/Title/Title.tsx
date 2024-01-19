import { ReactNode } from "react";
import classes from "./Title.module.scss";

export enum TitleSize {
  XXL = "xxl",
}

interface TitleProps {
  size: TitleSize;
  children: ReactNode;
}

export const Title = ({ size, children }: TitleProps) => {
  switch (size) {
    case TitleSize.XXL:
      return <h1 className={classes.title__xxl}>{children}</h1>;
  }
};

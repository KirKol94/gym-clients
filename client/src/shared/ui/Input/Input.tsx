import { InputHTMLAttributes } from "react";
import classes from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string;
}

export const Input = ({ inputName, ...props }: InputProps) => {
  return (
    <div className={classes.wrapper}>
      <span className={classes.span}>{inputName}</span>
      <input {...props} className={classes.input} />
    </div>
  );
};

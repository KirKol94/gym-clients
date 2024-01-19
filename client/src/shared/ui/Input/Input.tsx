import { InputHTMLAttributes } from "react";
import classes from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string;
}

export const Input = ({ inputName, ...props }: InputProps) => {
  return (
    <div className={classes.inputWrapper}>
      <span className={classes.inputName}>{inputName}</span>
      <input {...props} className={classes.input} />
    </div>
  );
};

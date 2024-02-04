import { InputHTMLAttributes } from 'react'
import cx from 'classix'

import classes from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string
  className?: string
}

export const Input = ({ inputName, className, ...props }: InputProps) => {
  return (
    <div className={cx(classes.wrapper, className)}>
      <span className={classes.span}>{inputName}</span>
      <input {...props} className={classes.input} />
    </div>
  )
}

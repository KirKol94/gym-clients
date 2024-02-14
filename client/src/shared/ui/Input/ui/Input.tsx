import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import cx from 'classix'

import classes from './Input.module.scss'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string
  error?: string
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ inputName, className, error, ...props }, ref) => {
  return (
    <div className={cx(classes.wrapper, className)}>
      <span className={classes.span}>{inputName}</span>
      <input ref={ref} {...props} className={classes.input} />
      <div className={classes.error}>{error}</div>
    </div>
  )
})

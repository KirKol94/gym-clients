import cls from './Switcher.module.scss'

export interface SwitcherProps {
  id: string
  checked: boolean
  onChange: () => void
  className?: string
}

export const Switcher = ({ id, className, onChange, checked }: SwitcherProps) => {
  return (
    <div className={`${cls.box} ${className}`}>
      <input className={cls.input} id={id} type="checkbox" onChange={onChange} checked={checked} />
      <label className={cls.label} htmlFor={id} />
    </div>
  )
}

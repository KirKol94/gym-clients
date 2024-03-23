import { useContext, useId } from 'react'

import { ThemeContext } from '@/app/providers/ThemeProvider'

import themeStyle from './Checkbox.module.scss'

export const Checkbox = () => {
  const checkboxId = useId()
  const { theme, setTheme } = useContext(ThemeContext)

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    setTheme(() => newTheme)
  }

  return (
    <div className={themeStyle.box}>
      <input
        className={themeStyle.input}
        id={checkboxId}
        type="checkbox"
        onChange={switchTheme}
        checked={theme === 'dark'}
      />
      <label className={themeStyle.label} htmlFor={checkboxId} />
    </div>
  )
}

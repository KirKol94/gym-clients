import { useContext } from 'react'

import { ThemeContext } from '@/app/providers/ThemeProvider/ThemeProvider'
import themeStyle from './CheckboxButton.module.scss'

export const CheckboxButton = () => {
  const [theme, setTheme] = useContext(ThemeContext)

  const switchTheme = () => {
    setTheme((current) => {
      const newTheme = current === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', JSON.stringify(newTheme))
      return newTheme
    })
  }
  return (
    <>
      <div className={themeStyle.box}>
        <input
          className={themeStyle.input}
          id="checkbox"
          type="checkbox"
          onChange={switchTheme}
          checked={theme === 'dark'}
        />
        <label className={themeStyle.label} htmlFor="checkbox" />
      </div>
    </>
  )
}

import { memo, useContext, useId } from 'react'
import cx from 'classix'

import { ThemeContext } from '@/app/providers/ThemeProvider'
import { Switcher } from '@/shared/ui/Switcher'
import { Text, textSize } from '@/shared/ui/Text'

import cls from './ThemeSwitcher.module.scss'

export interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const switcherId = useId()
  const themeSwitcherClass = cx(cls.themeSwitcher, className)

  const { theme, setTheme } = useContext(ThemeContext)

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    setTheme(() => newTheme)
  }

  return (
    <div className={themeSwitcherClass}>
      <Switcher id={switcherId} checked={theme === 'dark'} onChange={switchTheme} />
      <Text size={textSize.medium}>Включить {theme === 'dark' ? 'светлую' : 'тёмную'} тема</Text>
    </div>
  )
})

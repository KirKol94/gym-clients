import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { createContext, useEffect, useState } from 'react'

interface ThemeContextType {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
})

interface PropsThemeProvider extends PropsWithChildren {}

export const ThemeProvider = ({ children }: PropsThemeProvider) => {
  const checkSystemTheme = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  const themeValue = localStorage.getItem('theme') || checkSystemTheme()

  const [theme, setTheme] = useState(themeValue)

  useEffect(() => {
    if (theme) {
      document.body.id = theme
    }
  }, [theme])
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

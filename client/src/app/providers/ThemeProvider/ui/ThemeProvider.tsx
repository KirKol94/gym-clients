import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { createContext, useEffect, useState } from 'react'

interface ThemeContextType {
  theme: string | 'dark'
  setTheme: Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
})

interface PropsThemeProvider extends PropsWithChildren {}

export const ThemeProvider = ({ children }: PropsThemeProvider) => {
  const themeValue = localStorage.getItem('theme') || 'light'

  const [theme, setTheme] = useState(themeValue)

  useEffect(() => {
    if (theme) {
      document.body.id = theme
    }
  }, [theme])
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

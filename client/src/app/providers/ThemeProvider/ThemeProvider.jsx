import React, { createContext, useEffect } from 'react'

import { useLocalStorage } from '@/shared/hooks/LocalStorage/useLocalStorage'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.body.id = 'dark'
    } else {
      document.body.id = 'light'
    }
  }, [theme])

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
}

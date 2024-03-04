import { useState, useEffect } from 'react'

export const useLocalStorage = () => {
  const [theme, setTheme] = useState(() => {
    const theme = JSON.parse(localStorage.getItem('theme'))
    return theme || 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.body.id = theme
    } else {
      document.body.id = theme
    }
  }, [theme])

  return [theme, setTheme]
}

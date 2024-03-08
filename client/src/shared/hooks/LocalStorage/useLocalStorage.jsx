import { useState } from 'react'

export const useLocalStorage = () => {
  const [theme, setTheme] = useState(() => {
    const theme = JSON.parse(localStorage.getItem('theme'))
    return theme || 'light'
  })

  return [theme, setTheme]
}

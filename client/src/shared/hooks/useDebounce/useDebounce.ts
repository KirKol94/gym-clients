import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Устанавливаем таймер для задержки
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Очистка таймера при каждом изменении value или unmount компонента
    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}

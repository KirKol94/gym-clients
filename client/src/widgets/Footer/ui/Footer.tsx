import { Text, textSize } from '@/shared/ui/Text'

import classes from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Text className={classes.text} size={textSize.small}>
        ©2024 prod by <a href="https://github.com/KirKol94">kirkol94</a>
      </Text>
    </footer>
  )
}

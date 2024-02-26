import { AppLink, appLinkSize } from '@/shared/ui/AppLink'
import { Text, textSize } from '@/shared/ui/Text'

import classes from './Footer.module.scss'

export const Footer = () => {
  const data = [
    {
      title: 'Техподдержка',
      link: '#',
    },
    {
      title: 'Построено на OpenCRM',
      link: '#',
    },
  ]

  return (
    <footer className={classes.footer}>
      <Text className={classes.text} size={textSize.small}>
        ©2020 Company Name
      </Text>
      <div className={classes.links}>
        {data.map((el, index) => (
          <AppLink to={el.link} size={appLinkSize.small} key={el.title + index}>
            {el.title}
          </AppLink>
        ))}
      </div>
    </footer>
  )
}

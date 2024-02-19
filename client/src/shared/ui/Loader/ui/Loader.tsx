import cx from 'classix'

import { loaderColor } from '@/shared/ui/Loader/model/types/loader.ts'
import { loaderSize } from '@/shared/ui/Loader/model/types/loader.ts'

import classes from './Loader.module.scss'

export type LoaderProps = {
  size?: (typeof loaderSize)[keyof typeof loaderSize]
  color?: (typeof loaderColor)[keyof typeof loaderColor]
}

export const Loader = ({ size, color }: LoaderProps) => {
  const className = cx(
    classes.wrapper,
    size === loaderSize.small && classes['small-loader'],
    size === loaderSize.big && classes['big-loader'],
    color === loaderColor.white && classes['white-loader'],
  )

  return (
    <div className={className}>
      <span className={classes.loader}>
        <div className={classes.circle} />
        <div className={classes.circle} />
        <div className={classes.circle} />
        <div className={classes.circle} />
      </span>
    </div>
  )
}

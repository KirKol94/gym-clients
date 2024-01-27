import cx from 'classix'

import { LoaderColor, LoaderSize } from '../model/types/loader'

import classes from './Loader.module.scss'

type LoaderProps = {
    size: LoaderSize,
    color: LoaderColor
}

export const Loader = ({ size, color }: LoaderProps) => {
  const className = cx(
    classes.wrapper,
    size === LoaderSize.SMALL && classes['small-loader'],
    size === LoaderSize.BIG && classes['big-loader'],
    color === LoaderColor.WHITE && classes['white-loader'],
  )

    return (
        <div className={className}>
            <span className={classes.loader}>
                <div className={classes.circle}/>
                <div className={classes.circle}/>
                <div className={classes.circle}/>
                <div className={classes.circle}/>
            </span>     
        </div>
    )

}

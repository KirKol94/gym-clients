import cx from "classix";
import classes from "./Loader.module.scss";

type ComponentProps = {
    size?: string,
    color?: string
}

export const Loader = ({ size, color }: ComponentProps) => {

    const className = cx(
        classes.loaderWrapper,
        size === "small" && classes.smallLoader,
        size === "big" && classes.bigLoader,
        color === "white" && classes.whiteLoader
    )

    return (
        <div className={className}>
            <span className={classes.loader}><div></div><div></div><div></div><div></div></span>     
        </div>
    )
}
 

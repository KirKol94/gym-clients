import rightArrow from "../assets/image/arrow.svg";

import classes from "./RightArrowButton.module.scss";


export const RightArrowButton = () => {
    return ( 
        <button className={classes["right-arrow-button"]}>
            <img src={rightArrow} />
        </button>
     );
}
 

import { Button, ButtonSize } from "@/shared/ui/Button";
import { Text, TextSize } from "@/shared/ui/Text";
import { Title, TitleSize } from "@/shared/ui/Title";

import classes from "./Alert.module.scss";

interface AlertInfo {
    count: number,
    title: string,
    alert: string
}

export const Alert = ({ count, title, alert }: AlertInfo) => {
    return ( 
        <div className={classes.wrapper}>
            <div className={classes.titleWrapper}>
                <Text size={TextSize.M} className={classes.counter}>{count}</Text>
                <Title size={TitleSize.XL}>{title}</Title>
            </div>
            <div className={classes.alertWrapper}>
                <Button size={ButtonSize.S}>Обработать</Button>
                <Text size={TextSize.S}>{alert}</Text>
            </div>
        </div>
     );
}
 
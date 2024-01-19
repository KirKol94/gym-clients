import { Title, TitleSize } from "@/shared/ui/Title";
import { Text, TextSize } from "@/shared/ui/Text";
import classes from "./LoginForm.module.scss";
import { Input } from "@/shared/ui/Input";
import { Button, ButtonSize } from "@/shared/ui/Button";
import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import { ROUTER_PATH } from "@/shared/const/path/PATH";

interface LoginFormProps {}

export const LoginForm = ({ className }: LoginFormProps) => (
  <>
    <Title size={TitleSize.XXL} className={classes.title}>
      Авторизация
    </Title>

    <form className={classes.form}>
      <Input inputName="Email" placeholder="Email" />
      <Input inputName="Пароль" placeholder="Пароль" />
      <div className={classes.footer}>
        <Button size={ButtonSize.M}>Войти</Button>

        <div>
          <Text size={TextSize.S}>Еще нет аккаунта?</Text>
          <AppLink to={ROUTER_PATH.REGISTER} size={AppLinkSize.S}>
            Регистрация
          </AppLink>
        </div>
      </div>
    </form>
  </>
);

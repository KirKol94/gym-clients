import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import { Button, ButtonSize } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Text, TextSize } from "@/shared/ui/Text";
import { Title, TitleSize } from "@/shared/ui/Title";

import { AuthFormType } from "./types";

import classes from "./AuthForm.module.scss";

interface AuthFormProps {
  type: AuthFormType;
}

export const AuthForm = ({ type }: AuthFormProps) => (
  <>
    <Title size={TitleSize.XXL} className={classes.title}>
      {type === AuthFormType.LOGIN && "Авторизация"}
      {type === AuthFormType.REGISTER && "Регистрация"}
    </Title>

    <form className={classes.form}>
      <Input inputName="Email" placeholder="Email" />
      <Input inputName="Пароль" placeholder="Пароль" />

      {type === AuthFormType.REGISTER && (
        <>
          <Input inputName="Имя" placeholder="Имя" />
          <Input inputName="Фамилия" placeholder="Фамилия" />
          <Input inputName="Отчество" placeholder="Отчество" />
        </>
      )}

      <div className={classes.footer}>
        <Button size={ButtonSize.M}>
          {type === AuthFormType.LOGIN && "Войти"}
          {type === AuthFormType.REGISTER && "Регистрация"}
        </Button>

        <div>
          <Text size={TextSize.S}>
            {type === AuthFormType.LOGIN && "Еще нет аккаунта?"}
            {type === AuthFormType.REGISTER && "Уже нет аккаунт?"}
          </Text>

          <AppLink
            to={
              type === AuthFormType.LOGIN
                ? ROUTER_PATH.REGISTER
                : ROUTER_PATH.LOGIN
            }
            size={AppLinkSize.S}
          >
            {type === AuthFormType.REGISTER && "Войти"}
            {type === AuthFormType.LOGIN && "Регистрация"}
          </AppLink>
        </div>
      </div>
    </form>
  </>
);

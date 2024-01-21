import { Title, TitleSize } from "@/shared/ui/Title";
import { Text, TextSize } from "@/shared/ui/Text";
import classes from "./AuthForm.module.scss";
import { Input } from "@/shared/ui/Input";
import { Button, ButtonSize } from "@/shared/ui/Button";
import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { AuthFormType } from "./types";
import { ChangeEvent, useState } from "react";

interface AuthFormProps {
  type: AuthFormType;
}

export const AuthForm = ({ type }: AuthFormProps) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [patronymic, setPatronymic] = useState<string>("");

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }
  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }
  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }
  function handleSurnameChange(event: ChangeEvent<HTMLInputElement>) {
    setSurname(event.target.value)
  }
  function handlePatronymicChange(event: ChangeEvent<HTMLInputElement>) {
    setPatronymic(event.target.value)
  }

  return (
    <>
      <Title size={TitleSize.XXL} className={classes.title}>
        {type === AuthFormType.LOGIN && "Авторизация"}
        {type === AuthFormType.REGISTER && "Регистрация"}
      </Title>

      <form className={classes.form}>
        <Input inputName="Email" placeholder="Email" onChange={handleEmailChange} value={email}/>
        <Input inputName="Пароль" placeholder="Пароль" onChange={handlePasswordChange} value={password}/>

        {type === AuthFormType.REGISTER && (
          <>
            <Input inputName="Имя" placeholder="Имя" onChange={handleNameChange} value={name}/>
            <Input inputName="Фамилия" placeholder="Фамилия" onChange={handleSurnameChange} value={surname}/>
            <Input inputName="Отчество" placeholder="Отчество" onChange={handlePatronymicChange} value={patronymic}/>
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
  )
};

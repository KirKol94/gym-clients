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

  const [userData, setUserData] = useState({
      email: "",
      password: "",
      name: "",
      surname: "",
      patronymic: ""
  })

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
      const {name, value} = event.target;
      setUserData(prev => ({
        ...prev, 
        [name]: value
      }))
  }

  return (
    <>
      <Title size={TitleSize.XXL} className={classes.title}>
        {type === AuthFormType.LOGIN && "Авторизация"}
        {type === AuthFormType.REGISTER && "Регистрация"}
      </Title>

      <form className={classes.form}>
        <Input inputName="Email" name="email" placeholder="Email" onChange={handleInputChange} value={userData.email}/>
        <Input inputName="Пароль" name="password" placeholder="Пароль" onChange={handleInputChange} value={userData.password}/>

        {type === AuthFormType.REGISTER && (
          <>
            <Input inputName="Имя" name="name" placeholder="Имя" onChange={handleInputChange} value={userData.name}/>
            <Input inputName="Фамилия" name="surname" placeholder="Фамилия" onChange={handleInputChange} value={userData.surname}/>
            <Input inputName="Отчество" name="patronymic" placeholder="Отчество" onChange={handleInputChange} value={userData.patronymic}/>
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

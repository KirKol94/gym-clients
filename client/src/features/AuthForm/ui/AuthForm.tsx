import { Title, TitleSize } from "@/shared/ui/Title";
import { Text, TextSize } from "@/shared/ui/Text";
import classes from "./AuthForm.module.scss";
import { Input } from "@/shared/ui/Input";
import { Button, ButtonSize } from "@/shared/ui/Button";
import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import { ROUTER_PATH } from "@/shared/const/path/routerPath";
import { AuthFormType } from "../types/authSchema";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/entities/User";
import { useAppDispatch } from "@/shared/hooks";
import { authByEmail, registerByUserData } from "../services/loginByEmail";

interface AuthFormProps {
  type: AuthFormType;
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
    name: "",
    surname: "",
    patronymic: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authLoginData = {
      email: userData.email,
      password: userData.password,
    };

    type === AuthFormType.REGISTER && dispatch(registerByUserData(userData));
    type === AuthFormType.LOGIN && dispatch(authByEmail(authLoginData));

    type === AuthFormType.REGISTER && navigate(ROUTER_PATH.LOGIN);
    type === AuthFormType.LOGIN && navigate(ROUTER_PATH.HOME);
  };

  return (
    <>
      <Title size={TitleSize.XXL} className={classes.title}>
        {type === AuthFormType.LOGIN && "Авторизация"}
        {type === AuthFormType.REGISTER && "Регистрация"}
      </Title>

      <form className={classes.form} onSubmit={handleSubmit}>
        <Input
          inputName="Email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={userData.email}
        />
        <Input
          inputName="Пароль"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={userData.password}
        />

        {type === AuthFormType.REGISTER && (
          <>
            <Input
              inputName="Имя"
              name="name"
              placeholder="Имя"
              onChange={handleChange}
              value={userData.name}
            />
            <Input
              inputName="Фамилия"
              name="surname"
              placeholder="Фамилия"
              onChange={handleChange}
              value={userData.surname}
            />
            <Input
              inputName="Отчество"
              name="patronymic"
              placeholder="Отчество"
              onChange={handleChange}
              value={userData.patronymic}
            />
          </>
        )}

        <div className={classes.footer}>
          <Button size={ButtonSize.M} type="submit">
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
};

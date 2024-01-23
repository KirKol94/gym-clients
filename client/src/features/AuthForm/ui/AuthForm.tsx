import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "@/entities/User";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { useAppDispatch } from "@/shared/hooks";
import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import { Button, ButtonSize } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Text, TextSize } from "@/shared/ui/Text";
import { Title, TitleSize } from "@/shared/ui/Title";

import { fetchAuthUser } from "../model/services/authUser";
import { fetchRegisterUser } from "../model/services/registerUser";
import { AuthType } from "../model/types/auth";

import classes from "./AuthForm.module.scss";

interface AuthFormProps {
  type: AuthType;
}

type FormData = Omit<User, "id"> & { password: string };

export const AuthForm = ({ type }: AuthFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    surname: "",
    patronymic: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    type === AuthType.LOGIN && handleLogin();
    type === AuthType.REGISTER && handleRegister();
  };

  const handleRegister = async () => {
    const res = await dispatch(fetchRegisterUser(userData));
    if (res?.payload?.accessToken) {
      navigate(ROUTER_PATH.LOGIN);
    }
  };

  const handleLogin = async () => {
    const authData = { email: userData.email, password: userData.password };
    const res = await dispatch(fetchAuthUser(authData));
    if (res?.payload?.accessToken) {
      navigate("/");
    }
  };

  return (
    <>
      <Title size={TitleSize.XXL} className={classes.title}>
        {type === AuthType.LOGIN && "Авторизация"}
        {type === AuthType.REGISTER && "Регистрация"}
      </Title>

      <form className={classes.form} onSubmit={handleSubmit}>
        <Input
          inputName="Email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={userData.email}
        />
        <Input
          inputName="Пароль"
          name="password"
          placeholder="Пароль"
          onChange={handleInputChange}
          value={userData.password}
        />

        {type === AuthType.REGISTER && (
          <>
            <Input
              inputName="Имя"
              name="name"
              placeholder="Имя"
              onChange={handleInputChange}
              value={userData.name}
            />
            <Input
              inputName="Фамилия"
              name="surname"
              placeholder="Фамилия"
              onChange={handleInputChange}
              value={userData.surname}
            />
            <Input
              inputName="Отчество"
              name="patronymic"
              placeholder="Отчество"
              onChange={handleInputChange}
              value={userData.patronymic}
            />
          </>
        )}

        <div className={classes.footer}>
          <Button size={ButtonSize.M} type="submit">
            {type === AuthType.LOGIN && "Войти"}
            {type === AuthType.REGISTER && "Регистрация"}
          </Button>

          <div>
            <Text size={TextSize.S}>
              {type === AuthType.LOGIN && "Еще нет аккаунта?"}
              {type === AuthType.REGISTER && "Уже нет аккаунт?"}
            </Text>

            <AppLink
              to={
                type === AuthType.LOGIN
                  ? ROUTER_PATH.REGISTER
                  : ROUTER_PATH.LOGIN
              }
              size={AppLinkSize.S}
            >
              {type === AuthType.REGISTER && "Войти"}
              {type === AuthType.LOGIN && "Регистрация"}
            </AppLink>
          </div>
        </div>
      </form>
    </>
  );
};

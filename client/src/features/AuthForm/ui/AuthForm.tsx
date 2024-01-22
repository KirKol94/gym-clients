import { Title, TitleSize } from "@/shared/ui/Title";
import { Text, TextSize } from "@/shared/ui/Text";
import classes from "./AuthForm.module.scss";
import { Input } from "@/shared/ui/Input";
import { Button, ButtonSize } from "@/shared/ui/Button";
import { AppLink, AppLinkSize } from "@/shared/ui/AppLink";
import { ROUTER_PATH } from "@/shared/const/path/PATH";
import { AuthFormType } from "../types/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserData } from "../types/types";
import { authFormActions } from "@/features/AuthForm";
import { useAppDispatch } from "@/shared/hooks";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  type: AuthFormType;
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
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

    dispatch(authFormActions.setAuthData(userData));

    type === AuthFormType.REGISTER && setUserToDb(userData);
    type === AuthFormType.LOGIN && checkIsAuth(userData);

    type === AuthFormType.REGISTER && navigate("/login");
    type === AuthFormType.LOGIN && navigate("/");
  };

  const $api = async <T> (
    url: string,
    method: "post" | "put" | "patch" | "delete" | "get",
    body: T
  ) => {
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      console.log(json);
    } catch (error) {
      throw new Error("При отправле данных произошла ошибка: ", error.message);
    }
  };

  const setUserToDb = async (user: UserData) => {
    await $api("http://localhost:3001/register", "post", user);
  };

  const checkIsAuth = async (user: Pick<UserData, "email" | "password">) => {
    await $api("http://localhost:3001/login", "post", user);
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

        {type === AuthFormType.REGISTER && (
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

import { AuthForm, AuthType } from '@/features/AuthForm'

import classes from './AuthPage.module.scss'

export interface AuthPageProps {
  type?: AuthType | AuthType.LOGIN
}

export const AuthPage = ({ type }: AuthPageProps) => {
  return (
    <div className={classes.page}>
      <header></header>

      {type === AuthType.LOGIN && <AuthForm type={AuthType.LOGIN} />}
      {type === AuthType.REGISTER && <AuthForm type={AuthType.REGISTER} />}

      <footer></footer>
    </div>
  )
}

export default AuthPage

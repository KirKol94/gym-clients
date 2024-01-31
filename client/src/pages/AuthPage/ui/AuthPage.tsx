import { AuthForm, AuthType } from '@/features/AuthForm'

import classes from './AuthPage.module.scss'

interface AuthPage {
  type?: AuthType
}

export const AuthPage = ({ type = AuthType.LOGIN }: AuthPage) => {
  return (
    <div className={classes.page}>
      {type === AuthType.LOGIN && <AuthForm type={type} />}
      {type === AuthType.REGISTER && <AuthForm type={type} />}
    </div>
  )
}

export default AuthPage

import React, { useState } from 'react'
import { useHistory } from 'react-router'
import {
  Page,
  AppTitle,
  UserInput,
  TryRequest,
  ChangePage
} from '../Styles/SignInSignUpStyles'
import ModalAlert from '../Shared/ModalAlert'

function SignIn () {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const history = useHistory()

  const loginOnEnter = (key) => {
    if (key === 'Enter') {
      validateInputs()
    }
  }

  const validateInputs = () => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const isValid = (
      userInfo.email.length > 0 &&
      regexEmail.test(userInfo.email) &&
      userInfo.password.length > 0
    )

    if (isValid) {
      history.push('/home')
    } else {
      if (!userInfo.email.length > 0) {
        ModalAlert({ title: 'Insira um email' })
      } else if (!regexEmail.test(userInfo.email) > 0) {
        ModalAlert({ title: 'Insira um email válido' })
      } else if (!userInfo.password.length > 0) {
        ModalAlert({ title: 'Insira uma senha' })
      } else {
        ModalAlert({ title: 'Email/senha incorretos' })
      }
    }
  }

  return (
    <Page>
        <AppTitle>MyWallet</AppTitle>
        <UserInput
            placeholder='E-mail'
            type='email'
            value={userInfo.email}
            onChange={(input) => setUserInfo({ ...userInfo, email: input.target.value })}
            onKeyUp={(keyboard => loginOnEnter(keyboard.nativeEvent.key))}
        />
        <UserInput
            placeholder='Senha'
            type='password'
            value={userInfo.password}
            onChange={(input) => setUserInfo({ ...userInfo, password: input.target.value })}
            onKeyUp={(keyboard => loginOnEnter(keyboard.nativeEvent.key))}
        />
        <TryRequest onClick={() => validateInputs()}>
            Entrar
        </TryRequest>
        <ChangePage to='/sign-up'>Primeira vez? Cadastre-se!</ChangePage>
    </Page>
  )
}

export default SignIn

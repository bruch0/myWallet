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
  const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '', repeatPassword: '' })
  const history = useHistory()

  const loginOnEnter = (key) => {
    if (key === 'Enter') {
      validateInputs()
    }
  }

  const validateInputs = () => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const isValid = (
      userInfo.name.length > 0 &&
      userInfo.email.length > 0 &&
      regexEmail.test(userInfo.email) &&
      userInfo.password.length > 0 &&
      userInfo.repeatPassword.length > 0 &&
      userInfo.password === userInfo.repeatPassword
    )

    if (isValid) {
      history.push('/sign-in')
    } else {
      if (!userInfo.name.length > 0) {
        ModalAlert({ title: 'Insira um nome de usuário' })
      } else if (!userInfo.email.length > 0) {
        ModalAlert({ title: 'Insira um email' })
      } else if (!regexEmail.test(userInfo.email) > 0) {
        ModalAlert({ title: 'Insira um email válido' })
      } else if (!userInfo.password.length > 0) {
        ModalAlert({ title: 'Insira uma senha' })
      } else {
        ModalAlert({ title: 'As senhas não conferem' })
      }
    }
  }

  return (
    <Page>
        <AppTitle>MyWallet</AppTitle>
        <UserInput
            placeholder='Nome'
            type='text'
            value={userInfo.name}
            onChange={(input) => setUserInfo({ ...userInfo, name: input.target.value })}
            onKeyUp={(keyboard => loginOnEnter(keyboard.nativeEvent.key))}
        />
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
        <UserInput
            placeholder='Confirme a senha'
            type='password'
            value={userInfo.repeatPassword}
            onChange={(input) => setUserInfo({ ...userInfo, repeatPassword: input.target.value })}
            onKeyUp={(keyboard => loginOnEnter(keyboard.nativeEvent.key))}
        />
        <TryRequest onClick={() => validateInputs()}>
            Cadastrar
        </TryRequest>
        <ChangePage to='/'>Já tem uma conta? Entre agora!</ChangePage>
    </Page>
  )
}

export default SignIn

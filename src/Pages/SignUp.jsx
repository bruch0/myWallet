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
import axios from 'axios'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import { actionOnEnter, validateSignUp } from '../Shared/functions'

function SignIn () {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '', repeatPassword: '' })
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const loginOnEnter = (key) => {
    if (actionOnEnter(key)) {
      validateInputs()
    }
  }

  const validateInputs = () => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const isValid = validateSignUp(userInfo)

    if (isValid) {
      setLoading(true)
      axios.post('http://localhost:4000/sign-up', { name: userInfo.name, email: userInfo.email, password: userInfo.password })
        .then(() => {
          history.push('/')
        })
        .catch((error) => {
          setLoading(false)
          if (error.response.status === 400) {
            ModalAlert({ title: 'A senha deve conter 5 caracteres ou mais' })
          } else if (error.response.status === 409) {
            ModalAlert({ title: 'Email já cadastrado' })
          }
        })
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
            loading={loading ? 1 : 0}
        />
        <UserInput
            placeholder='E-mail'
            type='email'
            value={userInfo.email}
            onChange={(input) => setUserInfo({ ...userInfo, email: input.target.value })}
            onKeyUp={(keyboard => loginOnEnter(keyboard.nativeEvent.key))}
            loading={loading ? 1 : 0}
        />
        <UserInput
            placeholder='Senha'
            type='password'
            value={userInfo.password}
            onChange={(input) => setUserInfo({ ...userInfo, password: input.target.value })}
            onKeyUp={(keyboard => loginOnEnter(keyboard.nativeEvent.key))}
            loading={loading ? 1 : 0}
        />
        <UserInput
            placeholder='Confirme a senha'
            type='password'
            value={userInfo.repeatPassword}
            onChange={(input) => setUserInfo({ ...userInfo, repeatPassword: input.target.value })}
            onKeyUp={(keyboard => loginOnEnter(keyboard.nativeEvent.key))}
            loading={loading ? 1 : 0}
        />
        <TryRequest onClick={() => validateInputs()}>
            {loading
              ? <Loader
                    type="ThreeDots"
                    color="#FFFFFF"
                    height={100}
                    width={100}
                />
              : 'Cadastrar'
            }
        </TryRequest>
        <ChangePage to='/'>Já tem uma conta? Entre agora!</ChangePage>
    </Page>
  )
}

export default SignIn

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

function SignIn () {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
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
      setLoading(true)
      axios.post('http://localhost:4000/sign-in', { email: userInfo.email, password: userInfo.password })
        .then(() => {
          history.push('/home')
        })
        .catch((error) => {
          setLoading(false)
          if (error.response.status === 404) {
            ModalAlert({ title: 'Email não cadastrado' })
          } else if (error.response.status === 400) {
            ModalAlert({ title: 'A senha contém menos de 5 caracteres' })
          } else if (error.response.status === 401) {
            ModalAlert({ title: 'Senha incorreta' })
          }
        })
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
        <TryRequest onClick={() => validateInputs()}>
            {loading
              ? <Loader
                    type="ThreeDots"
                    color="#FFFFFF"
                    height={100}
                    width={100}
                    timeout={3000}
                />
              : 'Entrar'
            }
            {/*  */}
        </TryRequest>
        <ChangePage to='/sign-up'>Primeira vez? Cadastre-se!</ChangePage>
    </Page>
  )
}

export default SignIn

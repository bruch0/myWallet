import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
  Page,
  AppTitle,
  UserInput,
  TryRequest,
  ChangePage,
} from '../Styles/SignInSignUpStyles';
import { throwError, throwSuccess } from '../Shared/throwAlert';
import { actionOnEnter } from '../Shared/functions';
import { signUpUser } from '../Services/api';
import { validateSignUp } from '../Shared/inputValidations';

function SignIn() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    const validInputs = validateSignUp({ userInfo });

    if (validInputs) {
      setLoading(true);
      signUpUser({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      })
        .then(() => {
          throwSuccess({ title: 'Conta cadastrada com sucesso' });
          navigate('/');
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 400) {
            throwError({ title: 'A senha deve conter 5 caracteres ou mais' });
          } else if (error.response.status === 409) {
            throwError({ title: 'Email já cadastrado' });
          }
        });
    }
  };

  const signUpOnEnter = (key) => {
    if (actionOnEnter(key)) {
      validateInputs();
    }
  };

  const inputs = [
    {
      placeholder: 'Nome',
      type: 'text',
      value: userInfo.name,
      onChange: (input) =>
        setUserInfo({ ...userInfo, name: input.target.value }),
    },
    {
      placeholder: 'E-mail',
      type: 'email',
      value: userInfo.email,
      onChange: (input) =>
        setUserInfo({ ...userInfo, email: input.target.value }),
    },
    {
      placeholder: 'Senha',
      type: 'password',
      value: userInfo.password,
      onChange: (input) =>
        setUserInfo({ ...userInfo, password: input.target.value }),
    },
    {
      placeholder: 'Confirme a senha',
      type: 'password',
      value: userInfo.repeatPassword,
      onChange: (input) =>
        setUserInfo({ ...userInfo, repeatPassword: input.target.value }),
    },
  ];

  return (
    <Page>
      <AppTitle>MyWallet</AppTitle>
      {inputs.map((input) => (
        <UserInput
          placeholder={input.placeholder}
          type={input.type}
          value={input.value}
          onChange={input.onChange}
          onKeyUp={(keyboard) => signUpOnEnter(keyboard.nativeEvent.key)}
          loading={loading ? 1 : 0}
          key={input.placeholder}
        />
      ))}
      <TryRequest onClick={validateInputs}>
        {loading ? (
          <Loader type="ThreeDots" color="#FFFFFF" height={100} width={100} />
        ) : (
          'Cadastrar'
        )}
      </TryRequest>
      <ChangePage to="/">Já tem uma conta? Entre agora!</ChangePage>
    </Page>
  );
}

export default SignIn;

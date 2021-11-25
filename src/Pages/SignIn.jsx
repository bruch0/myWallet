import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {
  Page,
  AppTitle,
  UserInput,
  TryRequest,
  ChangePage,
} from '../Styles/SignInSignUpStyles';
import { throwError } from '../Shared/throwAlert';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { signInUser } from '../Services/api';
import { actionOnEnter } from '../Shared/functions';
import { validateSignIn } from '../Shared/inputValidations';
import { storeToken, getToken } from '../Shared/tokenManager';
import { storeUser, getUser } from '../Shared/userManager';

function SignIn() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    const token = getToken();

    if (user && token) navigate('/home');
  }, []);

  const validateInputs = () => {
    const validInputs = validateSignIn({ userInfo });

    if (validInputs) {
      setLoading(true);
      signInUser({
        email: userInfo.email,
        password: userInfo.password,
      })
        .then((response) => {
          storeToken({ token: response.data.token });
          storeUser({ user: response.data.name });
          navigate('/home');
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 404) {
            throwError({ title: 'Email não cadastrado' });
          } else if (error.response.status === 400) {
            throwError({ title: 'A senha contém menos de 5 caracteres' });
          } else if (error.response.status === 401) {
            throwError({ title: 'Senha incorreta' });
          }
        });
    }
  };

  const loginOnEnter = (key) => {
    if (actionOnEnter(key)) {
      validateInputs();
    }
  };

  const inputs = [
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
          onKeyUp={(keyboard) => loginOnEnter(keyboard.nativeEvent.key)}
          loading={loading ? 1 : 0}
          key={input.placeholder}
        />
      ))}
      <TryRequest onClick={validateInputs}>
        {loading ? (
          <Loader type="ThreeDots" color="#FFFFFF" height={100} width={100} />
        ) : (
          'Entrar'
        )}
      </TryRequest>
      <ChangePage to="/sign-up">Primeira vez? Cadastre-se!</ChangePage>
    </Page>
  );
}

export default SignIn;

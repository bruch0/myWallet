/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { UserInput, TryRequest } from '../Styles/SignInSignUpStyles';
import { Topbar, Greetings } from '../Styles/HomeStyles';
import { Page, Cancel } from '../Styles/TransactionStyles';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { throwError, throwSuccess } from '../Shared/throwAlert';
import { getUser } from '../Shared/userManager';
import { getToken } from '../Shared/tokenManager';
import { actionOnEnter } from '../Shared/functions';
import { validateTransaction } from '../Shared/inputValidations';
import { registerTransaction } from '../Services/api';

function Transaction() {
  const [transaction, setTransaction] = useState({
    token: '',
    value: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const descriptionRef = useRef();
  const { search } = useLocation();

  const user = getUser();
  const token = getToken();

  if (!user || !token) {
    navigate('/');
  }

  const type = new URLSearchParams(search).get('type');
  if (type === undefined || (type !== 'input' && type !== 'output')) {
    navigate('/home');
  }

  const validInputValue = (input) => {
    if (Number(transaction.value) === 0 && input !== '0') {
      setTransaction({ ...transaction, value: input });
    } else if (Number(transaction.value) !== 0) {
      setTransaction({ ...transaction, value: input });
    }
  };

  const sendTransaction = () => {
    const isValid = validateTransaction({ transaction });

    if (isValid) {
      setLoading(true);
      registerTransaction({
        value: transaction.value,
        description: transaction.description,
        type,
        token,
      })
        .then(() => {
          setLoading(false);
          throwSuccess({ title: 'Transação registrada!' });
          navigate('/home');
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const SendOnEnter = (key) => {
    if (actionOnEnter(key)) {
      sendTransaction();
    }
  };

  const inputs = [
    {
      placeholder: 'Valor',
      type: 'tel',
      value: transaction.value,
      onChange: (input) => validInputValue(input.target.value),
      onKeyUp: (keyboard) => {
        if (keyboard.nativeEvent.key === 'Enter')
          descriptionRef.current.focus();
      },
    },
    {
      placeholder: 'Descrição',
      type: 'text',
      value: transaction.description,
      onChange: (input) =>
        setTransaction({ ...transaction, description: input.target.value }),
      ref: descriptionRef,
    },
  ];

  return (
    <Page>
      <Topbar isTransaction={1}>
        {transaction.token}
        <Greetings>Nova {type === 'input' ? 'entrada' : 'saída'}</Greetings>
      </Topbar>
      {inputs.map((input) => (
        <UserInput
          placeholder={input.placeholder}
          type={input.type}
          value={input.value}
          onChange={input.onChange}
          onKeyUp={
            input.onKeyUp
              ? input.onKeyUp
              : (keyboard) => SendOnEnter(keyboard.nativeEvent.key)
          }
          ref={input.ref ? input.ref : null}
          loading={loading ? 1 : 0}
          key={input.placeholder}
        />
      ))}
      <TryRequest onClick={sendTransaction}>
        {loading ? (
          <Loader type="ThreeDots" color="#FFFFFF" height={100} width={100} />
        ) : (
          `Salvar ${type === 'input' ? 'entrada' : 'saída'}`
        )}
      </TryRequest>
      <Cancel onClick={() => navigate('/home')}>Cancelar</Cancel>
    </Page>
  );
}

export default Transaction;

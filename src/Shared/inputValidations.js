import { throwError } from './throwAlert';

const regexEmail = /[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]/;

const validateSignUp = ({ userInfo }) => {
  if (!userInfo.name) {
    throwError({ title: 'Insira um nome de usuário' });
    return 0;
  }

  if (userInfo.name.length < 3) {
    throwError({ title: 'Insira ao menos 3 letras no seu nome de usuário' });
    return 0;
  }

  if (!userInfo.email) {
    throwError({ title: 'Insira um email' });
    return 0;
  }

  if (!regexEmail.test(userInfo.email)) {
    throwError({ title: 'Insira um email válido' });
    return 0;
  }

  if (!userInfo.password) {
    throwError({ title: 'Insira uma senha' });
    return 0;
  }

  if (userInfo.password.length < 8) {
    throwError({ title: 'A senha deve conter ao menos 8 caractéres' });
    return 0;
  }

  if (userInfo.password !== userInfo.repeatPassword) {
    throwError({ title: 'As senhas não conferem' });
    return 0;
  }

  return 1;
};

const validateSignIn = ({ userInfo }) => {
  if (!userInfo.email) {
    throwError({ title: 'Insira um email' });
    return 0;
  }

  if (!regexEmail.test(userInfo.email)) {
    throwError({ title: 'Insira um email válido' });
    return 0;
  }

  if (!userInfo.password) {
    throwError({ title: 'Insira uma senha' });
    return 0;
  }

  if (userInfo.password.length < 8) {
    throwError({ title: 'A senha deve conter ao menos 8 caractéres' });
    return 0;
  }

  return 1;
};

const validateTransaction = ({ transaction }) => {
  if (transaction.value.length < 1) {
    throwError({ title: 'O valor mínimo para transações é 1 real' });
    return 0;
  }

  if (transaction.description.length < 5) {
    throwError({ title: 'Insira uma descrição com 5 caracteres ou mais' });
    return 0;
  }

  if (transaction.description.length > 20) {
    throwError({ title: 'Insira uma descrição com 20 caracteres ou menos' });
    return 0;
  }

  return 1;
};

export { validateSignUp, validateSignIn, validateTransaction };

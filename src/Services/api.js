import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://my-wallet-api-bruch0.herokuapp.com/'
      : 'http://localhost:4000/',
});

function makeHeaders(token) {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}

const signUpUser = ({ name, email, password }) =>
  api.post('/sign-up', { name, email, password });

const signInUser = ({ email, password }) =>
  api.post('/sign-in', { email, password });

const getUserTransactions = ({ token }) =>
  api.get('/transactions', makeHeaders(token));

const registerTransaction = ({ value, description, type, token }) =>
  api.post('/transactions', { value, description, type }, makeHeaders(token));

export { signUpUser, signInUser, getUserTransactions, registerTransaction };

/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './Styles/GlobalStyles';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Transaction from './Pages/Transaction';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Topbar, Greetings } from '../Styles/HomeStyles';
import { removeUser } from '../Shared/userManager';
import { removeToken } from '../Shared/tokenManager';

function Top({ user }) {
  const navigate = useNavigate();
  return (
    <Topbar>
      <Greetings>Olá, {user?.split(' ')[0]}!</Greetings>
      <RiLogoutBoxRLine
        onClick={() => {
          removeUser();
          removeToken();
          navigate('/');
        }}
      />
    </Topbar>
  );
}

export default Top;

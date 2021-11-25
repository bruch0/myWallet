import React from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { Actions, Transaction, ActionTitle } from '../Styles/HomeStyles';

// eslint-disable-next-line react/prop-types
function UserActions() {
  return (
    <Actions>
      <Transaction to="/transaction?type=input">
        <AiOutlinePlusCircle />
        <ActionTitle>Nova entrada</ActionTitle>
      </Transaction>

      <Transaction to="/transaction?type=output">
        <AiOutlineMinusCircle />
        <ActionTitle>Nova saída</ActionTitle>
      </Transaction>
    </Actions>
  );
}

export default UserActions;

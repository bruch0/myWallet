import React from 'react';
import { Log, Info, Date, Name, Value } from '../Styles/HomeStyles';

// eslint-disable-next-line react/prop-types
function TransactionLog({ date, name, value, type }) {
  return (
    <Log>
      <Info>
        <Date>{date}</Date>
        <Name>{name}</Name>
      </Info>
      <Value type={type}>{value}</Value>
    </Log>
  );
}

export default TransactionLog;

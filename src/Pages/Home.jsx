import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../Styles/SignInSignUpStyles';
import { Transactions, Total, Value, Title } from '../Styles/HomeStyles';
import { getUserTransactions } from '../Services/api';
import { calculateTotalBalance } from '../Shared/functions';
import { getUser } from '../Shared/userManager';
import { getToken } from '../Shared/tokenManager';
import TransactionLog from '../Components/TransactionLog';
import Top from '../Components/Top';
import UserActions from '../Components/Actions';

function Home() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const user = getUser();
  const token = getToken();

  if (!user || !token) {
    navigate('/');
  }

  useEffect(() => {
    getUserTransactions({ token }).then((response) => {
      setTransactions(response.data);
    });
  }, [token]);

  const total = calculateTotalBalance(transactions);

  return (
    <Page isHome={1}>
      <Top user={user} />
      <Transactions isZero={transactions.length === 0 ? 1 : 0}>
        {transactions.length !== 0
          ? transactions.map((transaction) => (
              <TransactionLog
                date={transaction.date}
                name={transaction.description}
                value={Number(transaction.value).toFixed(2).replace('.', ',')}
                type={transaction.type}
                key={transaction.id}
              />
            ))
          : 'Não há registros de entrada ou saída'}
        <Total isZero={transactions.length === 0 ? 1 : 0}>
          <Title>SALDO</Title>
          <Value type={total > 0 ? 'input' : 'output'}>
            {total.toFixed(2).replace('.', ',')}
          </Value>
        </Total>
      </Transactions>
      <UserActions />
    </Page>
  );
}

export default Home;

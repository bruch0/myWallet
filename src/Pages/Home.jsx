import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Page } from '../Styles/SignInSignUpStyles'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import {
  Topbar, Greetings, Transactions, Actions, Transaction,
  ActionTitle, Log, Info, Date, Name, Total, Value, Title
} from '../Styles/HomeStyles'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import axios from 'axios'
import { calculateTotalBalance } from '../Shared/functions'

function Home () {
  const [transactions, setTransactions] = useState([])
  const history = useHistory()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (!userInfo) {
	history.push('/')
  }
  console.log('oi')
  const token = userInfo ? userInfo.token : '';
  useEffect(() => {
    axios.get('http://localhost:4000/transactions', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setTransactions(response.data)
      })
  }, [token])

  const total = calculateTotalBalance(transactions)

  return (
    <Page isHome={1}>
        <Topbar>
            <Greetings>
                Olá, {userInfo ? userInfo.user : ''}!
            </Greetings>
            <RiLogoutBoxRLine
                onClick={() => {
                  localStorage.removeItem('userInfo')
                  history.push('/')
                }}
            />
        </Topbar>
        <Transactions isZero = {transactions.length === 0 ? 1 : 0}>
            {transactions.length !== 0
              ? transactions.map((transaction, index) =>
              <TransactionLog
                    date={transaction.date}
                    name={transaction.description}
                    value={Number(transaction.value).toFixed(2).replace('.', ',')}
                    type={transaction.type}
                    key={index}
                />
              )
              : 'Não há registros de entrada ou saída'}
            <Total isZero = {transactions.length === 0 ? 1 : 0}>
                <Title>SALDO</Title>
                <Value type={total > 0 ? 'input' : 'output'}>
                    {total.toFixed(2).replace('.', ',')}
                </Value>
            </Total>
        </Transactions>
        <Actions>
            <Transaction to={{ pathname: '/transaction', state: 'input' }}>
                <AiOutlinePlusCircle />
                <ActionTitle>
                    Nova entrada
                </ActionTitle>
            </Transaction>

            <Transaction to={{ pathname: '/transaction', state: 'output' }}>
                <AiOutlineMinusCircle />
                <ActionTitle>
                    Nova saída
                </ActionTitle>
            </Transaction>
        </Actions>
    </Page>
  )
}

function TransactionLog ({ date, name, value, type }) {
  return (
        <Log>
            <Info>
                <Date>
                    {date}
                </Date>
                <Name>
                    {name}
                </Name>
            </Info>
            <Value type={type}>
                {value}
            </Value>
        </Log>
  )
}

export default Home

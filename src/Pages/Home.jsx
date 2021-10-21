import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Page } from '../Styles/SignInSignUpStyles'
import styled from 'styled-components'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import axios from 'axios'

function Home () {
  const [transactions, setTransactions] = useState([])
  const history = useHistory()
  const { user, token } = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    axios.get('http://localhost:4000/transactions', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setTransactions(response.data)
      })
  }, [])
  return (
    <Page isHome={1}>
        <Topbar>
            <Greetings>
                Olá, {user}!
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
              ? transactions.map((transaction, index) => <TransactionLog
                                                            date={'30/09'}
                                                            name={'Almoço'}
                                                            value={'59,90'}
                                                            key={index}
                                                        />
              )
              : 'Não há registros de entrada ou saída'}
            <Total isZero = {transactions.length === 0 ? 1 : 0}>
                <Title>SALDO</Title>
                <Value>
                    50,00
                </Value>
            </Total>
        </Transactions>
        <Actions>
            <Transaction to='/transaction' state={{ type: 'input' }}>
                <AiOutlinePlusCircle />
                <ActionTitle>
                    Nova entrada
                </ActionTitle>
            </Transaction>

            <Transaction to='/transaction' state={{ type: 'output' }}>
                <AiOutlineMinusCircle />
                <ActionTitle>
                    Nova saída
                </ActionTitle>
            </Transaction>
        </Actions>
    </Page>
  )
}

function TransactionLog ({ date, name, value }) {
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
            <Value>
                {value}
            </Value>
        </Log>
  )
}

const Topbar = styled.div`
    width: 90%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        height: 30px;
        width: 30px;
    }
`

const Greetings = styled.h1`
    font-size: 26px;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
`

const Transactions = styled.section`
    width: 90%;
    height: 70%;
    padding: ${props => props.isZero ? '20%' : '0% 3% 14% 3%'};
    background-color: #FFFFFF;
    border-radius: 5px;
    overflow-y: scroll;
    position: relative;
    display: ${props => props.isZero ? 'flex' : 'inherit'};
    justify-content: ${props => props.isZero ? 'center' : 'inherit'};
    align-items: ${props => props.isZero ? 'center' : 'inherit'};
    color: ${props => props.isZero ? '#868686' : ''};
    font-size: ${props => props.isZero ? '20px' : ''};
    font-family: ${props => props.isZero ? 'Raleway' : ''};
    text-align: ${props => props.isZero ? 'center' : ''};
`

const Actions = styled.div`
    width: 90%;
    height: 15%;
    display: flex;
    justify-content: space-between;
`

const Transaction = styled(Link)`
    width: 45%;
    height: 100%;
    background-color: #a31fff;
    border: 0px;
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    svg {
        height: 25px;
        width: 25px;
        color: white;
        margin-bottom: 10px;
    }
`

const ActionTitle = styled.p`
    font-size: 17px;
    font-weight: 700;
    color: white;
    font-family: 'Raleway', sans-serif;
`

const Log = styled.div`
    width: 100%;
    margin-top: 19px;
    display: flex;
    justify-content: space-between;
`

const Info = styled.div`
    display: flex;
`

const Date = styled.span`
    font-size: 16px;
    font-family: 'Raleway', sans-serif;
    color: #C6C6C6;
    margin-right: 5px;
`

const Name = styled.span`
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: black;
`

const Total = styled.div`
    width: 85%;
    height: 7%;
    background-color: #FFFFFF;
    display: ${props => props.isZero ? 'none' : 'flex'};
    justify-content: space-between;
    position: fixed;
    bottom: 20%;
    left: 7.5%;
    padding-top: 5%;
`

const Value = styled.span`
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: black;
`

const Title = styled.p`
    color: black;
    font-family: 'Raleway';
    font-size: 18px;
    font-weight: 700;
`

export default Home

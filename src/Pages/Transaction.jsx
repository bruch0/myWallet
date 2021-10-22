import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router'
import { UserInput, TryRequest } from '../Styles/SignInSignUpStyles'
import { Topbar, Greetings } from '../Styles/HomeStyles'
import { Page, Cancel } from '../Styles/TransactionStyles'
import axios from 'axios'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import ModalAlert from '../Shared/ModalAlert'
import { actionOnEnter } from '../Shared/functions'

function Transaction () {
  const [transaction, setTransaction] = useState({ token: '', value: '', description: '' })
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const descriptionRef = useRef()

  const type = history.location.state
  if (type === undefined) {
    history.push('/home')
  }

  const validValueInput = (input) => {
    if (Number(transaction.value) === 0 && input !== '0') {
      setTransaction({ ...transaction, value: input })
    } else if (Number(transaction.value) !== 0) {
      setTransaction({ ...transaction, value: input })
    }
  }

  const validateInputs = () => {
    if (transaction.description.length < 5) {
      ModalAlert({ title: 'Insira uma descrição com 5 caracteres ou mais' })
    } else if (transaction.description.length > 20) {
      ModalAlert({ title: 'Insira uma descrição com 20 caracteres ou menos' })
    } else if (transaction.value.length < 1) {
      ModalAlert({ title: 'O valor mínimo para transações é 1 real' })
    } else {
      sendTransaction()
    }
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const sendTransaction = () => {
    setLoading(true)
    axios.post('http://localhost:4000/transactions', { value: transaction.value, description: transaction.description, type }, { headers: { Authorization: `Bearer ${userInfo ? userInfo.token : ''}` } })
      .then(() => {
        setLoading(false)
        history.push('/home')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const SendOnEnter = (key) => {
    if (actionOnEnter(key)) {
      validateInputs()
    }
  }

  return (
    <Page>
        <Topbar isTransaction={1}>
            {transaction.token}
            <Greetings>
                Nova {type === 'input' ? 'entrada' : 'saída'}
            </Greetings>
        </Topbar>
        <UserInput
            placeholder='Valor'
            type='number'
            value={transaction.value}
            onChange={(input) => validValueInput(input.target.value)}
            onKeyUp={(keyboard) => {
              if (keyboard.nativeEvent.key === 'Enter') {
                descriptionRef.current.focus()
              }
            }}
            loading={loading ? 1 : 0}
        />
        <UserInput
            ref={descriptionRef}
            placeholder='Descrição'
            type='text'
            value={transaction.description}
            onChange={(input) => setTransaction({ ...transaction, description: input.target.value })}
            onKeyUp={(keyboard => SendOnEnter(keyboard.nativeEvent.key))}
            loading={loading ? 1 : 0}
        />

        <TryRequest onClick={() => validateInputs()}>
            {loading
              ? <Loader
                    type="ThreeDots"
                    color="#FFFFFF"
                    height={100}
                    width={100}
                />
              : `Salvar ${type === 'input' ? 'entrada' : 'saída'}`
            }
        </TryRequest>
        <Cancel onClick={() => history.push('/home')}>
            Cancelar
        </Cancel>
    </Page>
  )
}

export default Transaction

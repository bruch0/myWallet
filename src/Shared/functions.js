const calculateTotalBalance = (transactions) => {
  let total = 0
  transactions.forEach((transaction) => {
    if (transaction.type === 'input') {
      total += Number(transaction.value)
    } else {
      total -= Number(transaction.value)
    }
  })

  return total
}

const actionOnEnter = (key) => {
  return key === 'Enter'
}

const validateSignIn = (userInfo) => {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const isValid = (
    userInfo.email.length > 0 &&
    regexEmail.test(userInfo.email) &&
    userInfo.password.length > 0
  )

  return isValid
}

const validateSignUp = (userInfo) => {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const isValid = (
    userInfo.name.length > 0 &&
      userInfo.email.length > 0 &&
      regexEmail.test(userInfo.email) &&
      userInfo.password.length > 0 &&
      userInfo.repeatPassword.length > 0 &&
      userInfo.password === userInfo.repeatPassword
  )

  return isValid
}

export {
  calculateTotalBalance,
  actionOnEnter,
  validateSignIn,
  validateSignUp
}

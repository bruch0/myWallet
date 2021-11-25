const calculateTotalBalance = (transactions) => {
  let total = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === 'input') {
      total += Number(transaction.value);
    } else {
      total -= Number(transaction.value);
    }
  });

  return total;
};

const actionOnEnter = (key) => key === 'Enter';

export { calculateTotalBalance, actionOnEnter };

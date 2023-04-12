// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_CURRENCIES_WALLET = 'ADD_CURRENCIES_WALLET';
export const ADD_EXPENSES_WALLET = 'ADD_EXPENSES_WALLET';
export const REMOVE_EXPENSES_WALLET = 'REMOVE_EXPENSES_WALLET';
export const EDIT_EXPENSES_WALLET = 'EDIT_EXPENSES_WALLET';
export const UPDATE_EXPENSE_WALLET = 'UPDATE_EXPENSE_WALLET';
export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const addCurrenciesWallet = (wallet) => ({
  type: ADD_CURRENCIES_WALLET,
  wallet,
});

export const addExpensesWallet = (wallet) => ({
  type: ADD_EXPENSES_WALLET,
  wallet,
});

export const removeExpenseWallet = (wallet) => ({
  type: REMOVE_EXPENSES_WALLET,
  wallet,
});

export const editExpenseWallet = (wallet) => ({
  type: EDIT_EXPENSES_WALLET,
  wallet,
});

export const updateExpenseWallet = (wallet) => ({
  type: UPDATE_EXPENSE_WALLET,
  wallet,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const arrayCurrencies = Object.keys(data).filter((currencie) => currencie !== 'USDT');
  dispatch(addCurrenciesWallet({ currencies: arrayCurrencies }));
};

export const fetchCurrentValue = (estado, expenses) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();

  dispatch(addExpensesWallet(
    { expenses: [
      ...expenses,
      { id: expenses.length, ...estado, exchangeRates: { ...data },
      },
    ] },
  ));
};

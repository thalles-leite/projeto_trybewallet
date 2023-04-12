const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_CURRENCIES_WALLET':
    return {
      ...state,
      currencies: [...action.wallet.currencies],
    };
  case 'ADD_EXPENSES_WALLET':
    return {
      ...state,
      expenses: [...action.wallet.expenses],
    };
  case 'REMOVE_EXPENSES_WALLET': {
    const newExpenses = state.expenses.filter((expense) => expense !== action.wallet);

    return {
      ...state,
      expenses: [...newExpenses],
    };
  }
  case 'EDIT_EXPENSES_WALLET': {
    const { id } = action.wallet;
    return {
      ...state,
      editor: true,
      idToEdit: id,
    };
  }

  case 'UPDATE_EXPENSE_WALLET': {
    const updatedExpenses = state.expenses.map((expense) => {
      if (expense.id === action.wallet.id) {
        return ({ ...action.wallet, exchangeRates: expense.exchangeRates });
      }
      return expense;
    });
    console.log(state);
    return {
      ...state,
      expenses: [...updatedExpenses],
      editor: false,
    };
  }
  default:
    return state;
  }
};

export default wallet;

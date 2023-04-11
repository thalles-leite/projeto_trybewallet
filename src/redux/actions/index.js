// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const addWallet = (wallet) => ({
  type: ADD_WALLET,
  wallet,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const arrayCurrencies = Object.keys(data).filter((currencie) => currencie !== 'USDT');
  dispatch(addWallet({ currencies: arrayCurrencies }));
};

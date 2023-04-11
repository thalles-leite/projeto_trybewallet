const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_USER':
    return {
      ...state,
      ...action.user,
    };
  default:
    return state;
  }
};

export default user;

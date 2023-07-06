const INITIAL_STATE = {
  theme: 'Light',
};

const theme = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE_THEME':
    return {
      ...state,
      theme: state.theme === 'Dark' ? 'Light' : 'Dark',
    };
  default:
    return state;
  }
};

export default theme;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import { CssBaseline } from '@mui/material';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Light } from './themes/Light';
import { Dark } from './themes/Dark';

// função que retorna o tema escolhido a partir do estado global do Redux

function ThemeWrapper() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <ThemeProvider theme={ theme === 'Dark' ? Dark : Light }>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <Provider store={ store }>
        <ThemeWrapper />
      </Provider>
    </BrowserRouter>,
  );

serviceWorker.unregister();

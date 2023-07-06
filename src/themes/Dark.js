import { createTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';

export const Dark = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {

        root: {
          paddingLeft: 0,
          paddingRight: 0,
          '@media (min-width:600px)': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#004741',
          color: '#fff',
        },
        root: {
          fontSize: '1rem',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          textAlign: 'center',
          overflow: 'hidden',
          backgroundColor: '#303030',
          maxWidth: '12',
          '@media (max-width:600px)': { // Tamanho de fonte para telas menores que 600px
            fontSize: '0.6rem',
          },
          '@media (min-width:600px)': { // Tamanho de fonte para telas menores que 600px
            fontSize: '0.7rem',
          },
          '@media (min-width:900px)': { // Tamanho de fonte para telas maiores que 900px
            fontSize: '0.78rem',
          },
          '@media (min-width:1200px)': { // Tamanho de fonte para telas maiores que 900px
            fontSize: '0.8rem',
          },
        },
      },
    },
  },

  typography: {
    button: {
      fontSize: '1rem', // Tamanho de fonte inicial
      fontWeight: 500,
      '@media (max-width:600px)': { // Tamanho de fonte para telas menores que 600px
        fontSize: '0.72rem',
      },
      '@media (min-width:600px)': { // Tamanho de fonte para telas menores que 600px
        fontSize: '0.72rem',
      },
      '@media (min-width:900px)': { // Tamanho de fonte para telas maiores que 900px
        fontSize: '0.78rem',
      },
      '@media (min-width:1200px)': { // Tamanho de fonte para telas maiores que 900px
        fontSize: '1rem',
      },
    },
  },
  // MuiPaper: {
  //   styleOverrides: {
  //     root: {
  //       backgroundColor: '#121212',
  //     },
  //   },
  // },
  paper: {
    padding: 3,
    m: 1,
    gap: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    borderRadius: 5,
    boxShadow: 10,
    width: 1,
    maxWidth: 'sm',
    minWidth: 'xs',
  },

  nowrapClass: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '2em',
  },
  palette: {
    primary: {
      main: '#004741',
      contrastText: '#fff',
    },
    secondary: {
      main: '#04D5E2',
      contrastText: '#fff',
    },
    background: {
      default: '#121212',
      paper: '#303030',
    },
    text: {
      primary: '#fff', // Cor do texto padrão
      secondary: grey[500], // Cor do texto secundário
      disabled: grey[300], // Cor do texto desabilitado
      hint: grey[300], // Cor do texto de sugestão
      input: '#fff', // Cor do texto do input
    },
    action: {
      active: '#fff', // Cor dos ícones ativos
      hover: '#121212', // Cor dos ícones quando o mouse está em cima
      selected: '#fff', // Cor dos ícones selecionados
      disabled: grey[300], // Cor dos ícones desabilitados
      disabledBackground: grey[500], // Cor de fundo dos ícones desabilitados
    },

  },

});

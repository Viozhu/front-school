import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import Head from 'next/head';
import { useState } from 'react';
import { Header } from '../src/stylesComponents';
import CustomContext from '../src/Context/index';
import { ITStudent } from '../src/interface';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const theme = createTheme({
    status: {
      danger: orange[500],
    },
    palette: {
      primary: {
        main: orange[500],
      },
    },
  });

  const handlerUser = {
    setUser: (user) => {
      setUser(user);
    },
    user,
  };
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Academy IT </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomContext.Provider value={handlerUser}>
        <Header />
        <Component {...pageProps} />
      </CustomContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;

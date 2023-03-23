import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Header } from '../src/stylesComponents';
import CustomContext from '../src/Context/index';
import '../styles/global.css';
import axios from 'axios';

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
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    },
    user,
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

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

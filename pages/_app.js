import Head from 'next/head';
import { useState } from 'react';
import Header from '../src/Components/stylesComponents/Header';
import CustomContext from '../src/Context/index';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const handlerUser = {
    setUser: (user) => {
      setUser(user);
    },
    user,
  };
  return (
    <>
      <Head>
        <title>Academy IT </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomContext.Provider value={handlerUser}>
        <Header />
        <Component {...pageProps} />
      </CustomContext.Provider>
    </>
  );
}

export default MyApp;

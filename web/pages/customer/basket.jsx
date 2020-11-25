import React, { useContext } from 'react';
import Head from 'next/head';
import Navigation from '../../components/navigation';
import styles from '../../styles/customer/Basket.module.scss';

import BasketContext from '../../contexts/basket';

const Basket = () => {
  const { basket, dispatch } = useContext(BasketContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <p>{basket}</p>
      </main>
    </div>
  )
}

export default Basket;
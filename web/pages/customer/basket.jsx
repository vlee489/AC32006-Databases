import React, { useContext } from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Navigation from '../../components/navigation';
import styles from '../../styles/customer/Basket.module.scss';

import BasketContext from '../../contexts/basket';

const BasketPage = () => {
  const { basket, dispatch } = useContext(BasketContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Basket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Container>
          <pre>{JSON.stringify(basket, null, 2)}</pre>
        </Container>
      </main>
    </div>
  )
}

export default BasketPage;
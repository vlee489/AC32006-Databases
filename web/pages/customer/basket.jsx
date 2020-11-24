import React, { useContext } from 'react';
import Head from 'next/head';
import Navigation from '../../components/navigation';
import styles from '../../styles/customer/Basket.module.scss';

import { useQuery } from '@apollo/client';
import withApollo from "../../libraries/apollo";

import BasketContext from '../../libraries/basket';

export default function Basket() {
  const { basket, setBasket } = useContext(BasketContext);

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

import Head from 'next/head';
import Navigation from '../components/navigation';
import styles from '../styles/index.module.scss';

import { useQuery } from '@apollo/client';
import withApollo from "../libraries/apollo";
import GET_PRODUCTS from "../queries/products";

function Browse() {
  const { data, error, loading } = useQuery(GET_PRODUCTS);

  const Data = () => {
    if (error) return <p>{`Error: ${error}`}</p>;
    if (loading) return <p>Loading...</p>; 
    return <p>{data.getProducts.Name}</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Generic Flatpack Furniture</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Data></Data>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(Browse);
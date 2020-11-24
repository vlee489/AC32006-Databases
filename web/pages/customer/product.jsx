import Head from 'next/head';
import { Button } from 'react-bootstrap';
import Navigation from '../../components/navigation';
import styles from '../../styles/customer/Product.module.scss';

export default function Product() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <p>Category</p>
        <img />
        <h1>Product</h1>
        <p>Dimensions</p>
        <p>Description</p>
        <p>Price</p>
        <Button variant="outline-info">Add to basket</Button>
      </main>
    </div>
  )
}

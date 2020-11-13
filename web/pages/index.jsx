import Head from 'next/head';
import Navigation from '../components/navigation';
import styles from '../styles/index.module.scss';

export default function Browse() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Generic Flatpack Furniture</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <main className={styles.main}>
        <Navigation />
      </main>
    </div>
  )
}

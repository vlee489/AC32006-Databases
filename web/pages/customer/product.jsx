import Head from 'next/head'
import styles from '../styles/Product.module.css'

export default function Product() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      </main>
    </div>
  )
}

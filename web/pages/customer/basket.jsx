import Head from 'next/head'
import styles from '../../styles/customer/Basket.module.scss'
import Navigation from '../../components/navigation'

export default function Basket() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
      </main>
    </div>
  )
}

import Head from 'next/head'
import styles from '../../styles/staff/Admin.module.scss'
import Navigation from '../../components/navigation'

export default function Admin() {
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

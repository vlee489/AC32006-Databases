import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const hello = "Blah";

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <h2 className={styles.title}>{hello}</h2>
      </main>
    </div>
  )
}

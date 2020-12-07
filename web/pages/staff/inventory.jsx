import Head from 'next/head'
import styles from '../../styles/staff/Inventory.module.scss'
import Navigation from '../../components/navigation'
import withApollo from "../../libraries/apollo";
import { Container, Dropdown } from 'react-bootstrap'

const Inventory = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Container>
          
        </Container>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(Inventory);
import Head from 'next/head'
import styles from '../../styles/staff/Inventory.module.scss'
import Navigation from '../../components/navigation'
import withApollo from "../../libraries/apollo";
import { Container, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import { GET_BRANCHES } from '../../queries/branch';
import { useQuery } from '@apollo/client';



const Inventory = () => {
  const { loading, error, data } = useQuery(GET_BRANCHES);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Container>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Branches
  </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Container>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(Inventory);
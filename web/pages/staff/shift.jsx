import Head from 'next/head'
import { Table } from 'react-bootstrap'

import { useQuery } from '@apollo/client';
import withApollo from "../../libraries/apollo";
// import GET

import styles from '../../styles/staff/Shift.module.scss'
import Navigation from '../../components/navigation'

export default function Shift() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Slots left</th>
              <th>Staff required for shift</th>
              <th>Choose shift</th>
              <th>Cancel shift</th>
            </tr>
          </thead>
        </Table>
      </main>
    </div>
  )
}

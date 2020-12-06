import Head from 'next/head'
import { Container, Table } from 'react-bootstrap'
import { useContext } from 'react'

import UserContext from '../../contexts/user'
import { useQuery } from '@apollo/client';
import withApollo from "../../libraries/apollo";
import { GET_SHIFTS } from '../../queries/shifts';

import styles from '../../styles/staff/Shift.module.scss'
import Navigation from '../../components/navigation'
import Spinner from '../../components/spinner';

const ShiftsPage = () => {
  const { userToken, setUserToken } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_SHIFTS(1));
  // const data = {getShifts: {ShiftID: "69", Start: "4:20", End: "10:00", Branch: "Slough"}}

  const ShiftsTable = () => {
    if (loading) return <Spinner />;
    if (error) return <p>{`${error}`}</p>;
    if (data) {
      const shifts = data.getShifts;
      const staffOnShift = data.staffOnShift;
      const shiftOfStaff = data.shiftOfStaff;
      return (
        <tr>
          <td>date</td>
          <td>start</td>
          <td>end</td>
          <td>slots</td>
          <td>req</td>
          <td>choose</td>
          <td>cancel</td>
        </tr>
      )
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Slots left</th>
                <th>Staff required for shift</th>
                <th>Choose shift</th>
                <th>Cancel shift</th>
              </tr>
              <ShiftsTable />
            </thead>
          </Table>
        </Container>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(ShiftsPage);

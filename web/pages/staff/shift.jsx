import Head from 'next/head'
import { Container, Table, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import UserContext from '../../contexts/user'
import { useQuery } from '@apollo/client';
import withApollo from "../../libraries/apollo";
import GET_SHIFTS from '../../queries/shifts';
import { GET_BRANCHES } from '../../queries/branch';
import { loginStaff } from '../../queries/loginStaff';


import styles from '../../styles/staff/Shift.module.scss'
import Navigation from '../../components/navigation'
import Spinner from '../../components/spinner';

const ShiftsPage = () => {
  const router = useRouter();
  const { userToken, setUserToken } = useContext(UserContext);
  const { shiftID } = router.query;
  const { loading, error, data } = useQuery(GET_SHIFTS(1));

  const ShiftsTable = () => {
    if (loading) return <Spinner />;
    if (error) return <p>{`${error}`}</p>;
    if (data) {
      const shifts = data.getShifts;
      const staffOnShift = data.staffOnShift;
      const shiftOfStaff = data.shiftOfStaff;
      
      return (
        <tbody>
          {shifts.map(
            (Shift, i) => <tr key={i}>
                            <td>{new Date(Shift.Start).toLocaleDateString("ja-JP")}</td>
                            <td>{new Date(Shift.Start).toLocaleTimeString('en-UK')}</td>
                            <td>{new Date(Shift.End).toLocaleTimeString('en-UK')}</td>
                            <td>Slots</td>
                            <td>{Shift.StaffReq}</td>
                            <td><Button variant="primary">Choose shift</Button></td>
                            <td><Button variant="primary">Cancel shift</Button></td>
                          </tr>
            )
          }
        </tbody>
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
            </thead>
            <ShiftsTable />
          </Table>
        </Container>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(ShiftsPage);

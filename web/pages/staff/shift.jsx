import Head from 'next/head'
import { Container, Table, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import UserContext from '../../contexts/user'
import { useQuery, useMutation } from '@apollo/client';
import withApollo from "../../libraries/apollo";
import { GET_BRANCHES } from '../../queries/branch';
import { GET_SHIFTS, GET_STAFF_ON_SHIFT } from '../../queries/shifts';
import { ASSIGN_SHIFT } from '../../mutations/assignShift';
import { UNASSIGN_SHIFT } from '../../mutations/unassignShift'
import { LOGIN_STAFF } from '../../queries/loginStaff';
import routes from '../../routes'

import styles from '../../styles/staff/Shift.module.scss'
import Navigation from '../../components/navigation'
import Spinner from '../../components/spinner';
import BranchDropdown from '../../components/branchDropdown'
import { useState } from 'react'

const ShiftsPage = () => {

  const [branchSelected, setBranchSelected] = useState({ Name: "Dundee", BranchID: 1 })

  const router = useRouter();
  const { userToken, setUserToken } = useContext(UserContext);
  const { shiftID } = router.query;
  const shifts = useQuery(GET_SHIFTS(branchSelected.BranchID));
  const loggedInStaff = useQuery(LOGIN_STAFF);

  const changeBranch = (newBranch) => {
    setBranchSelected(newBranch)
  }


  const ShiftButton = ({ shift, loggedInStaff }) => {
    const [assignShift, { loading, error, data }] = useMutation(ASSIGN_SHIFT)
    const [unassignShift, { loading2, error2, data2 }] = useMutation(UNASSIGN_SHIFT)

    const onAssignShift = () => {
      assignShift({ variables: { ShiftID: shift.ShiftID, StaffID: loggedInStaff.data.loginStaff.StaffID } }).then(
        result => router.reload()
      )

    }

    const onUnassignShift = () => {
      unassignShift({ variables: { ShiftID: shift.ShiftID, StaffID: loggedInStaff.data.loginStaff.StaffID } }).then(
        result => router.reload()
      )
    }

    // debugger;
    const isOnShift = shift.Staff.filter(member => member.StaffID === loggedInStaff.data.loginStaff.StaffID)
    if (isOnShift.length > 0) {
      return (
        <Button variant="danger" onClick={onUnassignShift}>Leave shift</Button>
      )
    }

    return (
      <Button variant="primary" onClick={onAssignShift}>Join shift</Button>
    )

  }

  const ShiftsTable = () => {
    if (shifts.loading || loggedInStaff.loading) return <Spinner />;
    if (shifts.error || loggedInStaff.error) return <p>{`${shifts.error}`}</p>;
    if (shifts.data && loggedInStaff.data) {

      return (
        <tbody>
          {shifts.data.getShifts.map(
            (Shift, i) => <tr key={i}>
              <td>{new Date(Shift.Start).toLocaleDateString("ja-JP")}</td>
              <td>{new Date(Shift.Start).toLocaleTimeString('en-UK')}</td>
              <td>{new Date(Shift.End).toLocaleTimeString('en-UK')}</td>
              <td>{Shift.StaffReq - Shift.Staff.length}</td>
              <td>{Shift.StaffReq}</td>
              <td><ShiftButton shift={Shift} loggedInStaff={loggedInStaff} /></td>
            </tr>
          )
          }
        </tbody>
      )
    }
    return null
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Shifts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Container>
          <h1 className="text-center pt-5 mb-3">Shifts</h1>
          <BranchDropdown branchSelected={branchSelected} changeBranch={changeBranch} />
          <Table className="mt-3" striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Slots left</th>
                <th>Staff required for shift</th>
                <th>Choose shift</th>
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

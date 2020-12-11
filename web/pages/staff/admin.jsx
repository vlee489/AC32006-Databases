import { useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../../styles/staff/Admin.module.scss'
import Navigation from '../../components/navigation'
import BranchDropdown from '../../components/branchDropdown';
import withApollo from "../../libraries/apollo";
import { Accordion, Alert, Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row, Table } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client';
import Spinner from '../../components/spinner';
import positions from '../../positions';
import { ADD_STAFF, ASSIGN_STAFF_TO_BRANCH, REMOVE_STAFF_FROM_BRANCH } from '../../mutations/staff';
import { GET_STAFF } from '../../queries/staff';
import { GET_BRANCH_STAFF } from '../../queries/branchStaff';

const Admin = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>GFFC Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Container>
          <Accordion className="py-4" defaultActiveKey="0">
            <CreateStaffMember />
            <AssignStaffMember />
          </Accordion>
        </Container>
      </main>
    </div>
  )
}

const CreateStaffMember = () => {
  const defaultWage = 4.55;
  const [details, setDetails] = useState({ wage: defaultWage });
  const [validationError, setValidationError] = useState(null);
  const [addStaff, staffResponse] = useMutation(ADD_STAFF);
  const router = useRouter();

  const submit = e => {
    e.preventDefault();

    if (!details.firstName) setValidationError("We need a first name");
    else if (!details.lastName) setValidationError("We need a last name");
    else if (!details.phoneNumber) setValidationError("We need a phone number");
    else if (!details.niNumber) setValidationError("We need a National Insurance number of 9 characters long");
    else if (!details.email) setValidationError("We need a email");
    else if (!details.password) setValidationError("We need a password");
    else if (!details.address) setValidationError("We need an address");
    else if (!details.wage) setValidationError("We need a wage level");
    else if (!details.position) setValidationError("We need a position");
    else {
      setValidationError(null);
      addStaff({variables: {
        firstName: details.firstName,
        lastName: details.lastName,
        phoneNumber: details.phoneNumber,
        niNumber: details.niNumber,
        email: details.email,
        password: details.password,
        address: details.address,
        wage: parseFloat(details.wage),
        position: details.position
      }})
      // router.reload();
    }
  }

  const handleChange = (e, field) => {
    setDetails(
      details => {
        const newDetails = JSON.parse(JSON.stringify(details));
        newDetails[field] = e.target.value;
        return newDetails;
      }
    )
  }

  const handlePositionChange = num => {
    setDetails(
      details => {
        const newDetails = JSON.parse(JSON.stringify(details));
        newDetails.position = num;
        return newDetails;
      }
    )
  }

  const CreateStaffMemberFooter = ({ staffResponse, validationError }) => {
    if (validationError) {
      return <Alert variant="danger">{validationError}</Alert>;
    }

    const {loading, error, data} = staffResponse;
    if (loading) return <Spinner />
    if (error) <p>{JSON.stringify(error)}</p>
    if (data) {
      const staff = data.addStaff;
      return <Alert className="mt-3" variant="success">{`User ${staff.FirstName} ${staff.LastName} has been added as a staff member`}</Alert>;
    }
    else return null;
  }

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0">
        Create Staff Member
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" onChange={e => handleChange(e, "firstName")} placeholder="Enter first name" />
              </Form.Group>
              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" onChange={e => handleChange(e, "lastName")} placeholder="Enter last name" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" onChange={e => handleChange(e, "phoneNumber")} placeholder="Enter phone number" />
              </Form.Group>
              <Form.Group as={Col} controlId="formNINumber">
                <Form.Label>National Insurance Number</Form.Label>
                <Form.Control type="text" onChange={e => handleChange(e, "niNumber")} placeholder="Enter national insurance number" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={e => handleChange(e, "email")} placeholder="Enter email" />
              </Form.Group>
              <Form.Group as={Col} controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={e => handleChange(e, "password")} placeholder="Enter password" />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" onChange={e => handleChange(e, "address")} placeholder="Enter phone number" />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formWage">
                <Form.Label>Wage (£)</Form.Label>
                <Form.Control type="number" step="0.1" defaultValue={defaultWage} onChange={e => handleChange(e, "wage")} placeholder="Enter wage" />
              </Form.Group>
              <Form.Group as={Col} controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <PositionDropdown position={details.position} onPositionChange={num => handlePositionChange(num)}/>
              </Form.Group>
            </Form.Row>
            <Button variant="primary" onClick={e => submit(e)}>Submit</Button>
            <CreateStaffMemberFooter staffResponse={staffResponse} validationError={validationError} />
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

const PositionDropdown = ({ position, onPositionChange }) => {
  const title = position ? positions[position] : "Position";

  return (
    <DropdownButton id="dropdown-basic-button" title={title}>
      <Dropdown.Item onClick={() => onPositionChange(1)}>Executives</Dropdown.Item>
      <Dropdown.Item onClick={() => onPositionChange(2)}>Manager</Dropdown.Item>
      <Dropdown.Item onClick={() => onPositionChange(3)}>Associates</Dropdown.Item>
    </DropdownButton>
  )
}

const ToggleButton = ({ onBranch, onAssign, onUnAssign }) => {
  if (onBranch) return (
    <Button variant="danger" onClick={onUnAssign}>Unassign</Button>
  )
  return <Button onClick={onAssign}>Assign</Button>
}

const StaffMember = ({ member, onAssign, onUnAssign }) => {
  return (
    <tr>
      <td>{member.StaffID}</td>
      <td>{member.FirstName}</td>
      <td>{member.LastName}</td>
      <td>
        <div className="text-center">
          <ToggleButton onBranch={member.onBranch} onAssign={() => onAssign(member)} onUnAssign={() => onUnAssign(member)}/>
        </div>
      </td>
    </tr>
  )
}

const StaffTable = ({ staffProp, branch, onAssign, onUnAssign }) => {
  const staff = JSON.parse(JSON.stringify(staffProp));
  if (!branch) return <div className="pt-5"></div>;
  const { loading, error, data } = useQuery(GET_BRANCH_STAFF(branch.BranchID));

  if (loading) return <Spinner />
  if (error) return <p>{JSON.stringify(error)}</p>
  if (data) {
    const branchStaff = data.getBranchStaff;
    staff.forEach(staffMember => {
      branchStaff.forEach(branchMember => {
        if (branchMember.StaffID === staffMember.StaffID) {
          staffMember.onBranch = true;
        }
      })
    });
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Toggle</th>
          </tr>
        </thead>
        <tbody>
          {
            staff.map(member => <StaffMember key={member.StaffID} member={member} onAssign={onAssign} onUnAssign={onUnAssign}/>)
          }
        </tbody>
      </Table>
    )
  }
  return null;
}

const StaffList = ({ branch }) => {
  const { loading, error, data } = useQuery(GET_STAFF);
  const [assignStaff, assignStaffResponse] = useMutation(ASSIGN_STAFF_TO_BRANCH);
  const [removeStaff, removeStaffResponse] = useMutation(REMOVE_STAFF_FROM_BRANCH);
  const router = useRouter();

  const onAssign = member => {
    assignStaff({ variables: { branchId: branch.BranchID, staffId: member.StaffID } }).then(
      result => router.reload()
    )
  }
  const onUnAssign = member => {
    removeStaff({ variables: { branchId: branch.BranchID, staffId: member.StaffID } }).then(
      result => router.reload()
    )
  }

  if (loading || assignStaffResponse.loading || removeStaffResponse.loading) return <Spinner />;

  if (error) return <p>{JSON.stringify(error)}</p>;
  if (assignStaffResponse.error) return <p>{JSON.stringify(assignStaff.error)}</p>;
  if (removeStaffResponse.error) return <p>{JSON.stringify(removeStaffResponse.error)}</p>;

  if (data) return <StaffTable staffProp={data.getStaff} branch={branch} onAssign={onAssign} onUnAssign={onUnAssign} />;
  return null;
}

const AssignStaffMember = () => {
  const [branchSelected, setBranchSelected] = useState({ BranchID: 1, Name: "Dundee" });

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="1">
        Assign or unassign staff members
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="1">
        <Card.Body>
          <Row className="align-items-center justify-content-center mt-2 mb-4">
            <Col md="auto">
              <BranchDropdown branchSelected={branchSelected} changeBranch={newBranch => setBranchSelected(newBranch)} />
            </Col>
          </Row>
          <StaffList branch={branchSelected} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default withApollo({ ssr: false })(Admin);
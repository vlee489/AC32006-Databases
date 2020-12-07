import { useState } from 'react';
import Head from 'next/head'
import styles from '../../styles/staff/Admin.module.scss'
import Navigation from '../../components/navigation'
import withApollo from "../../libraries/apollo";
import { Accordion, Button, Card, Col, Container, Form, FormControl, InputGroup } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client';
import { FaSearch } from 'react-icons/fa';
import { ADD_STAFF } from '../../mutations/staff';
import { GET_STAFF } from '../../queries/staff';

const Admin = () => {
  const CreateStaffMember = () => {
    const [details, setDetails] = useState({});
    const [staffId, setStaffId] = useState(null);

    const handleChange = (e, field) => {
      setDetails(
        details => {
          const newDetails = JSON.parse(JSON.stringify(details));
          newDetails[field] = e.target.value;
          return newDetails;
        }
      )
    }

    const submit = () => {
      const { loading, error, data } = useMutation(ADD_STAFF(details));
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
                  <Form.Label>Wage</Form.Label>
                  <Form.Control type="number" step="0.1" defaultValue="4.55" onChange={e => handleChange(e, "wage")} placeholder="Enter wage" />
                </Form.Group>
                <Form.Group as={Col} controlId="formPosition">
                  <Form.Label>Position</Form.Label>
                  <Form.Control type="number" onChange={e => handleChange(e, "position")} placeholder="Enter position" />
                </Form.Group>
              </Form.Row>

              <Button variant="primary" type="submit" onClick={submit}>
                Submit
              </Button>
              {

              }
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  const AssignStaffMember = () => {
    const [searchText, setSearchText] = useState("");

    const PeopleList = () => {
      const { loading, error, data } = useQuery(GET_STAFF);
    }

    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Assign Staff Member to Branch
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <InputGroup className="mb-3 pt-5">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Search staff..."
                aria-label="Search"
                aria-describedby="search"
                onChange={e => setSearchText(e.target.value)}
              />
            </InputGroup>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  const UnassignStaffMember = () => {
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="2">
          Remove Staff Member from Branch
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
      </Card>
    )
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
          <Accordion className="py-4" defaultActiveKey="0">
            <CreateStaffMember />
            <AssignStaffMember />
            <UnassignStaffMember />
          </Accordion>
        </Container>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(Admin);
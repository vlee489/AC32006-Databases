import Head from 'next/head'
import {useState} from 'react'
import styles from '../../styles/staff/Inventory.module.scss'
import Navigation from '../../components/navigation'
import withApollo from "../../libraries/apollo";
import { Container, Dropdown, DropdownButton, ButtonGroup, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { GET_BRANCHES } from '../../queries/branch';
import { useQuery } from '@apollo/client';
import BranchDropdown from '../../components/branchDropdown'



const Inventory = () => {
  const { loading, error, data } = useQuery(GET_BRANCHES);
  const [branch, setBranch] = useState (null)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Container>

       

        
        <Navbar bg="light" expand="lg">
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <BranchDropdown branchSelected={branch} changeBranch={(newBranch)=>setBranch(newBranch)}/> 
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search Products" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
</Container>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(Inventory);
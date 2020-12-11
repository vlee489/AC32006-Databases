import Head from 'next/head'
import { Container, Table, Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import UserContext from '../../contexts/user'
import { useQuery, useMutation } from '@apollo/client';
import withApollo from "../../libraries/apollo";
import { GET_BRANCHES } from '../../queries/branch';
import { GET_INVENTORY } from '../../queries/inventory';
import { UPDATE_INVENTORY } from '../../mutations/updateInventory';
import routes from '../../routes'

import categories from '../../categories'
import styles from '../../styles/staff/Shift.module.scss'
import Navigation from '../../components/navigation'
import Spinner from '../../components/spinner';
import BranchDropdown from '../../components/branchDropdown'
import { useState, useRef, useEffect } from 'react'

const InventoryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [branchSelected, setBranchSelected] = useState({Name: "Dundee", BranchID: 1})

  const router = useRouter();
  const { userToken, setUserToken } = useContext(UserContext);
  const inventory = useQuery(GET_INVENTORY(branchSelected.BranchID));

  const changeBranch = (newBranch) => {
    setBranchSelected(newBranch)
  }

  const QuantityButton = ({inventory}) => {
    const [qText, setQtext] = useState("");
    const qTextRef = useRef (null)
    const [updateInventory, {loading, error, data}] = useMutation(UPDATE_INVENTORY)
  
    useEffect (()=>{
    if (qTextRef) qTextRef.current.focus()
    }, [qText])

    const onUpdateInventory= () => {
      updateInventory({variables: {BranchID: inventory.Branch.BranchID, ProductID: inventory.Product.ProductID, Qty: parseInt(qText)}}).then(
        result => router.reload()
      )
        
    }
    return(
      <Form inline>
        <FormControl ref={qTextRef} type="text" placeholder="Quantity" className="mr-sm-2" value={qText} onChange={e => setQtext(e.target.value)} />
        <Button variant="primary" onClick={onUpdateInventory}>Update</Button>
      </Form>
      
    )
  }
  
  const InventoryTable = () => {
    if (inventory.loading) return <Spinner />;
    if (inventory.error) return <p>{`${shifts.error}`}</p>;
    if (inventory.data) {
      const inventoryData = inventory.data.getInventory;
      const searchFiltered = inventoryData.filter(
        product => {
          if (!searchText) return true;
          else if (product.Product.Name.toLowerCase().includes(searchText.toLowerCase())) return true;
        }
      );
      return (
        <tbody>
          {searchFiltered.map(
            (Inventory, i) => <tr key={i}>
                                <td>{Inventory.Product.ProductID}</td>
                                <td>{Inventory.Product.Name}</td>
                                <td>{categories[Inventory.Product.Category].name}</td>
                                <td>£{Inventory.Product.Price}</td>
                                <td>{Inventory.Product.Weight}kg</td>
                                <td>{Inventory.Product.Colour}</td>
                                <td>{Inventory.Product.Dimensions}</td>
                                <td>{Inventory.QTY}</td>
                                <td><QuantityButton inventory={Inventory}/></td>
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
        <title>Inventory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Container>
          <h1>Inventory</h1>
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <BranchDropdown branchSelected={branchSelected} changeBranch={changeBranch}/>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search Products" className="mr-sm-2" onChange={e => setSearchText(e.target.value)} />
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Colour</th>
                <th>Dimensions (cm)</th>
                <th>Quantity</th>
                <th>Update quantity</th>
              </tr>
            </thead>
            <InventoryTable />
          </Table>
        </Container>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(InventoryPage);

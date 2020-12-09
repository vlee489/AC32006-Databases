import Head from 'next/head'
import { Container, Table, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import UserContext from '../../contexts/user'
import { useQuery, useMutation } from '@apollo/client';
import { GET_PURCHASES } from '../../queries/purchases'
import { DISPATCH_PURCHASE } from '../../mutations/purchase'
import withApollo from "../../libraries/apollo";
import routes from '../../routes'

import styles from '../../styles/staff/Shift.module.scss'
import Navigation from '../../components/navigation'
import Spinner from '../../components/spinner';
import BranchDropdown from '../../components/branchDropdown'
import { useState } from 'react'

const PurchasesPage = () => {

    const [branchSelected, setBranchSelected] = useState({ BranchID: 1 })

    const router = useRouter();
    const purchases = useQuery(GET_PURCHASES(branchSelected.BranchID))

    const changeBranch = (newBranch) => {
        setBranchSelected(newBranch)
    }


    const DispatchButton = ({ Purchase }) => {
        const [dispatchPurchase, { loading, error, data }] = useMutation(DISPATCH_PURCHASE)

        const onDispatchPurchase = () => {
            dispatchPurchase({ variables: { PurchaseID: Purchase.PurchaseID, Dispatched: true } }).then(
                result => router.reload()
            )
        }

        // debugger;
        if (Purchase.Dispatched) {
            return (
                <Button variant="outline-danger" disabled>Order Dispatched</Button>
            )
        }

        return (
            <Button variant="primary" onClick={onDispatchPurchase}>Dispatch Order</Button>
        )

    }


    const PurchaseTable = () => {
        if (purchases.loading) return <Spinner />;
        if (purchases.error) return <p>{`${purchases.error}`}</p>;
        if (purchases.data) {

            return (
                <tbody>
                    {purchases.data.getBranchPurchases.map(
                        (Purchase, i) => <tr key={i}>
                            <td>{`${Purchase.CustomerFirstName} ${Purchase.CustomerLastName}`}</td>
                            <td>{Purchase.BillingAddress}</td>
                            <td>{Purchase.DeliveryAddress}</td>
                            <td>{Purchase.Paid == 1 ? "Paid" : "Pending"}</td>
                            <td>{`£${Purchase.TotalPrice}`}</td>
                            <td>{String(Purchase.Products)}</td>
                            <td><DispatchButton Purchase={Purchase} /></td>
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
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Navigation />
                <Container>
                    <BranchDropdown branchSelected={branchSelected} changeBranch={changeBranch} />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Billing Adddress</th>
                                <th>Delivery Address</th>
                                <th>Paid</th>
                                <th>Total Price</th>
                                <th>Products</th>
                                <th>Dispatched</th>
                            </tr>
                        </thead>
                        <PurchaseTable />
                    </Table>
                </Container>
            </main>
        </div>
    )
}

export default withApollo({ ssr: false })(PurchasesPage);


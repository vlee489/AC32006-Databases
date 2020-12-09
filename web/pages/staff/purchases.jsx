import Head from 'next/head'
import { Container, Table, Button, Card, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useRouter } from 'next/router'

import { useQuery, useMutation } from '@apollo/client';
import { GET_PURCHASES } from '../../queries/purchases'
import { DISPATCH_PURCHASE } from '../../mutations/purchase'
import withApollo from "../../libraries/apollo";

import styles from '../../styles/staff/Shift.module.scss'
import Navigation from '../../components/navigation'
import Spinner from '../../components/spinner';
import BranchDropdown from '../../components/branchDropdown'
import { useState } from 'react'

const PurchasesPage = () => {

    const [branchSelected, setBranchSelected] = useState({Name: "Dundee", BranchID: 1 })

    const router = useRouter();
    const purchases = useQuery(GET_PURCHASES(branchSelected.BranchID))

    const changeBranch = (newBranch) => {
        setBranchSelected(newBranch)
    }


    const DispatchButton = ({ Purchase }) => {
        const [dispatchPurchase, { loading, error, data }] = useMutation(DISPATCH_PURCHASE)

        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Click to un-dispatch order
            </Tooltip>
        );

        const onDispatchPurchase = () => {
            dispatchPurchase({ variables: { PurchaseID: Purchase.PurchaseID, Dispatched: true } }).then(
                result => router.reload()
            )
        }

        const onUnDispatchPurchase = () => {
            dispatchPurchase({ variables: { PurchaseID: Purchase.PurchaseID, Dispatched: false } }).then(
                result => router.reload()
            )
        }

        if (Purchase.Dispatched) {
            return (
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                    <Button variant="outline-danger" onClick={onUnDispatchPurchase}>Order Dispatched</Button>
                </OverlayTrigger>
            )
        }

        return (
            <Button variant="primary" onClick={onDispatchPurchase}>Dispatch Order</Button>
        )

    }


    const PurchaseList = () => {
        if (purchases.loading) return <Spinner />;
        if (purchases.error) return <p>{`${purchases.error}`}</p>;
        if (purchases.data) {

            return (
                <tbody>
                    {purchases.data.getBranchPurchases.map(
                        (Purchase, i) => <Row>
                            <br></br>
                            <Card>
                                <Card.Header>{`Purchase No.${Purchase.PurchaseID}`}</Card.Header>
                                <Card.Body>
                                    <Card.Subtitle>Ordered By:</Card.Subtitle>
                                    <Card.Text>{`${Purchase.CustomerFirstName} ${Purchase.CustomerLastName}`}</Card.Text>
                                    <Card.Subtitle>Billing Address:</Card.Subtitle>
                                    <Card.Text>{Purchase.BillingAddress}</Card.Text>
                                    <Card.Subtitle>Delivery Address:</Card.Subtitle>
                                    <Card.Text>{Purchase.DeliveryAddress}</Card.Text>
                                    <Card.Subtitle>Paid?:</Card.Subtitle>
                                    <Card.Text>{Purchase.Paid == 1 ? "Yes" : "Pending"}</Card.Text>
                                    <Card.Subtitle>Total Order Price:</Card.Subtitle>
                                    <Card.Text>{`£${Purchase.TotalPrice}`}</Card.Text>
                                    <DispatchButton Purchase={Purchase} />
                                    <Card.Title>Products Ordered</Card.Title>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Colour</th>
                                                <th>Weight</th>
                                                <th>Dimensions</th>
                                                <th>Qty Ordered</th>
                                            </tr>
                                        </thead>
                                        {Purchase.Products.map(
                                            (item, i) => <tr key={i}>
                                                <td>{item.Product.Name}</td>
                                                <td>{`£${item.Product.Price}`}</td>
                                                <td>{item.Product.Colour}</td>
                                                <td>{item.Product.Weight}</td>
                                                <td>{item.Product.Dimensions}</td>
                                                <td>{item.Qty}</td>
                                            </tr>
                                        )}
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Row>
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
                <title>Purchases</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Navigation />
                <Container>
                    <Row className="align-items-center justify-content-center mt-2 mb-4">
                        <Col>
                            <br></br>
                            <Row>
                                <BranchDropdown branchSelected={branchSelected} changeBranch={changeBranch} />
                            </Row>
                            <br></br>
                            <PurchaseList />
                            <br></br>
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    )
}

export default withApollo({ ssr: false })(PurchasesPage);


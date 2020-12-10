import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { Alert, Button, Container, Card, Form, Row, Col } from "react-bootstrap";
import Navigation from '../../components/navigation';
import Spinner from '../../components/spinner';
import BranchDropdown from '../../components/branchDropdown';
import withApollo from "../../libraries/apollo";
import { CREATE_PURCHASE } from '../../mutations/purchase';
import { useMutation } from '@apollo/client';
import BasketContext from '../../contexts/basket';
import basketActions from "../../basketActions";
import styles from '../../styles/customer/Checkout.module.scss';

const Checkout = () => {
  const { basket, dispatch } = useContext(BasketContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [billingAddress, setBillingAddress] = useState([]);
  const [branch, setBranch] = useState({ BranchID: 1, Name: "Dundee" });
  const [validationError, setValidationError] = useState("");
  const [checkoutMutation, { loading, error, data }] = useMutation(CREATE_PURCHASE);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleDeliveryAddress = (address, field) => {
    setDeliveryAddress(
      deliveryAddress => {
        const copy = JSON.parse(JSON.stringify(deliveryAddress));
        copy[field] = address;
        return copy;
      }
    );
  }

  const handleBillingAddress = (address, field) => {
    setBillingAddress(
      billingAddress => {
        const copy = JSON.parse(JSON.stringify(billingAddress));
        copy[field] = address;
        return copy;
      }
    );
  }

  const checkout = () => {
    if (firstName.length < 1 || firstName.length > 45) setValidationError("Please enter a first name between 1 and 45 characters");
    else if (lastName.length < 1 || lastName.length > 45) setValidationError("Please enter a last name between 1 and 45 characters");
    else if (deliveryAddress.length < 1 || deliveryAddress[0] === "") setValidationError("Please enter a delivery address");
    else if (billingAddress.length < 1 || billingAddress[0] === "") setValidationError("Please enter a billing address");
    else {
      setValidationError("");
      const productOrders = basket.items.map(item => {
        return {
          ProductID: item.ProductID,
          Qty: item.Quantity
        }
      });
      checkoutMutation({
        variables: {
          branch: branch.BranchID,
          customerFirstName: firstName,
          customerLastName: lastName,
          billingAddress: billingAddress.toString(),
          deliveryAddress: deliveryAddress.toString(),
          products: productOrders
        }
      });
    }
  }

  const OrderScreen = ({ loading, error, data, orderComplete, onOrderComplete }) => {
    if (orderComplete) {
      const purchase = data.createPurchase;
      return (
        <Row>
          <Col>
            <Card>
              <Card.Header>{`Purchase No.${purchase.PurchaseID}`}</Card.Header>
              <Card.Body>
                <Card.Subtitle>Ordered By:</Card.Subtitle>
                <Card.Text>{`${purchase.CustomerFirstName} ${purchase.CustomerLastName}`}</Card.Text>
                <Card.Subtitle>Billing Address:</Card.Subtitle>
                <Card.Text>{purchase.BillingAddress}</Card.Text>
                <Card.Subtitle>Delivery Address:</Card.Subtitle>
                <Card.Text>{purchase.DeliveryAddress}</Card.Text>
                <Card.Subtitle>Paid?:</Card.Subtitle>
                <Card.Text>{purchase.Paid == 1 ? "Yes" : "Pending"}</Card.Text>
                <Card.Subtitle>Total Order Price:</Card.Subtitle>
                <Card.Text>{`£${purchase.TotalPrice}`}</Card.Text>
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
                  {purchase.Products.map(
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
          </Col>
        </Row>
      )
    }
    if (loading) return <Spinner />;
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    if (data) {
      onOrderComplete();
      dispatch({ type: basketActions.clearBasket })
    }
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main>
        <Container className={styles.container}>
          {
            !loading && !error && !data &&
            <Card className={styles.checkoutCard}>
              <Card.Body>
                <Card.Title className="text-center">Checkout</Card.Title>
                {
                  (!orderComplete && basket.items.length < 1) &&
                  <h4 className="mt-4">You need to add some items to the cart before you can checkout</h4>
                }
                {
                  (!orderComplete && basket.items.length > 0) &&
                  <div>
                    <Form>
                      <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Text className="text-muted">Enter your first name.</Form.Text>
                        <Form.Control type="name" placeholder="Hugh" onChange={e => setFirstName(e.target.value)} />
                      </Form.Group>
                      <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Text className="text-muted">Enter your last name.</Form.Text>
                        <Form.Control type="name" placeholder="Mungous" onChange={e => setLastName(e.target.value)} />
                      </Form.Group>
                      <Form.Group controlId="formAddress">
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Text className="text-muted">Enter your delivery address.</Form.Text>
                        <Form.Control type="addressLine1" placeholder="Flat 1" onChange={e => handleDeliveryAddress(e.target.value, 0)} />
                        <Form.Control type="addressLine2" placeholder="1 Example Street" onChange={e => handleDeliveryAddress(e.target.value, 1)} />
                        <Form.Control type="addressLine3" placeholder="Exampleton" onChange={e => handleDeliveryAddress(e.target.value, 2)} />
                        <Form.Control type="addressLine4" placeholder="EX1 EX1" onChange={e => handleDeliveryAddress(e.target.value, 3)} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Dispatch Branch</Form.Label>
                        <BranchDropdown branchSelected={branch} changeBranch={b => setBranch(b)} />
                      </Form.Group>
                      <Form.Group controlId="formAddress">
                        <Form.Label>Billing Address</Form.Label>
                        <Form.Text className="text-muted">Enter your billing address.</Form.Text>
                        <Form.Control type="addressLine1" placeholder="Flat 1" onChange={e => handleBillingAddress(e.target.value, 0)} />
                        <Form.Control type="addressLine2" placeholder="1 Example Street" onChange={e => handleBillingAddress(e.target.value, 1)} />
                        <Form.Control type="addressLine3" placeholder="Exampleton" onChange={e => handleBillingAddress(e.target.value, 2)} />
                        <Form.Control type="addressLine4" placeholder="EX1 EX1" onChange={e => handleBillingAddress(e.target.value, 3)} />
                      </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={checkout}>Credit/Debit card Checkout</Button>
                  </div>
                }

              </Card.Body>
              {
                validationError &&
                <Card.Footer>
                  <Alert className="mt-3" variant="danger">{validationError}</Alert>
                </Card.Footer>
              }
            </Card>
          }
          {
            (loading || error || data) &&
            <OrderScreen loading={loading} error={error} data={data} orderComplete={orderComplete} onOrderComplete={() => setOrderComplete(true)} />
          }
        </Container>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(Checkout);
import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { Button, Container, Card, Form } from "react-bootstrap";
import Navigation from '../../components/navigation';
import withApollo from "../../libraries/apollo";
import BasketContext from '../../contexts/basket';
import styles from '../../styles/customer/Checkout.module.scss';

const Checkout = () => {
  const [basket] = useContext(BasketContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [errors, setErrors] = useState([]);

  const handleDeliveryAddress = (address, field) => {
    setDeliveryAddress(
      deliveryAddress => {
        copy = JSON.stringify(JSON.parse(deliveryAddress));
        copy[field] = address;
        return copy;
      }
    );
  }

  const handleBillingAddress = (address, field) => {
    setBillingAddress(
      billingAddress => {
        copy = JSON.stringify(JSON.parse(billingAddress));
        copy[field] = address;
        return copy;
      }
    );
  }

  const checkout = () => {

  }

  const CheckoutFooter = () => {
    if (errors.length > 0) return <p>{errors}</p>;
    return <pre>{JSON.stringify(basket, null, 2)}</pre>;
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
          <Card className={styles.loginCard}>
            <Card.Body>
              <Card.Title className="text-center">Checkout</Card.Title>
              <Form>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First AddressName</Form.Label>
                  <Form.Text className="text-muted">
                    Enter your first and last name.
                  </Form.Text>
                  <Form.Control type="name" placeholder="Hugh Mungous" onChange={e => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Text className="text-muted">
                    Enter your first and last name.
                  </Form.Text>
                  <Form.Control type="name" placeholder="Hugh Mungous" onChange={e => setLastName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formAddress">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Text className="text-muted">
                    Enter your delivery address.
                  </Form.Text>
                  <Form.Control type="addressLine1" placeholder="Flat 1" onChange={e => setAddress1(e.target.value)} />
                  <Form.Control type="addressLine2" placeholder="1 Example Street" onChange={e => setAddress2(e.target.value)} />
                  <Form.Control type="addressLine3" placeholder="Exampleton" onChange={e => setAddress3(e.target.value)} />
                  <Form.Control type="addressLine4" placeholder="EX1 EX1" onChange={e => setAddress4(e.target.value)} />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={checkout}>Credit/Debit card Checkout</Button>
              <CheckoutFooter />
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(Checkout);
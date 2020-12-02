import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { Button, Container, Card, Form } from "react-bootstrap";
import Navigation from '../../components/navigation';
//import checkout from '../../libraries/checkout';
import UserContext from '../../contexts/user';
//import routes from '../../routes';
import styles from '../../styles/customer/Checkout.module.scss';

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [address4, setAddress4] = useState("");
  const {userToken, setUserToken} = useContext(UserContext);
  const [errors, setErrors] = useState([]);

  const sendCredentials = async () => {
    let data = {
      name,
      email,
      phoneNum,
      address1,
      address2,
      address3,
      address4
    }

    setErrors([]);

     const response = await login(data);

     if (response.success) {
       setUserToken(response);
    }
    else {
       setErrors(response.error);
     }
   }

  const CheckoutFooter = () => {
    if (errors.length > 0) return <p>{errors}</p>;
    return <pre>{JSON.stringify(userToken, null, 2)}</pre>;
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
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Text className="text-muted">
                    Enter your first and last name.
                  </Form.Text>
                  <Form.Control type="name" placeholder="Hugh Mungous" onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Text className="text-muted">
                    Enter an email address that we can use to contact you.
                  </Form.Text>
                  <Form.Control type="email" placeholder="example@example.com" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Text className="text-muted">
                    Enter your phone number so we can call you if needed.
                  </Form.Text>
                  <Form.Control type="phoneNumber" placeholder="01234 567890" onChange={e => setPhoneNum(e.target.value)} />
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
              <Button variant="primary" onClick={sendCredentials}>Credit/Debit card Checkout</Button>
              <CheckoutFooter />
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  )
}

export default Checkout;
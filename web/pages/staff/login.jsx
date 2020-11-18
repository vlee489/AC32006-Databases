import React, { useState } from 'react'; 
import Head from 'next/head';
import { Button, Container, Card, Form } from "react-bootstrap";
import Navigation from '../../components/navigation';
import login from '../../libraries/login';
import routes from '../../routes';
import styles from '../../styles/staff/Login.module.scss';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const sendCredentials = async () => {
    let data = {
      email,
      password
    }
    const response = await login(data);
    if (response.success) {
      console.log(`Success: ${response}`);
    }
    else {
      setErrors(response.error);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main>
        <Container className={styles.container}>
          <Card className={styles.loginCard}>
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={sendCredentials}>Sign in</Button>
              <p className={styles.error}>{errors}</p>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  )
}

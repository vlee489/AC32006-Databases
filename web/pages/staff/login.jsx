import Head from 'next/head'
import { Button, Container, Card, Row, Col, Form } from "react-bootstrap";
import Navigation from '../../components/navigation';
import styles from '../../styles/staff/Login.module.scss'

export default function Login() {
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
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Stay signed in" />
                </Form.Group>
              </Form>
              <Button variant="primary">Sign in</Button>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  )
}

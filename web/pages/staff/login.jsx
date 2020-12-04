import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Container, Card, Form, Alert } from "react-bootstrap";
import Navigation from '../../components/navigation';
import login from '../../libraries/login';
import UserContext from '../../contexts/user';
import Cookies from 'js-cookie';
import routes from '../../routes';
import styles from '../../styles/staff/Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userToken, setUserToken } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cookies = Cookies.get();
    if (cookies && cookies.userToken) setUserToken(JSON.parse(cookies.userToken));
  }, [])

  const sendCredentials = async () => {
    let data = {
      email,
      password
    }

    setErrors([]);

    try {
      const response = await login(data);
      if (response.success) {
        setUserToken(response);
        Cookies.set('userToken', response, { expires: new Date(response.expire) });
        if (typeof window !== 'undefined') router.push(routes.shift);
      }
      else {
        setErrors(response.error);
      }
    }
    catch(error) {
      setErrors("Sorry: Your login credentials are not correct");
    }
  }

  const LoginFooter = () => {
    if (errors.length > 0) return (
      <Alert className="mt-3" variant="danger">{errors}</Alert>
    );
    // return <pre>{JSON.stringify(userToken, null, 2)}</pre>;
    return null;
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
              <Card.Title className="text-center">Staff Login</Card.Title>
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
              <LoginFooter />
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  )
}

export default Login;
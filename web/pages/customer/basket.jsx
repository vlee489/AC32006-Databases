import { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import BasketContext from '../../contexts/basket';

import { Container, Card, Button, Col, Row, Form } from 'react-bootstrap';
import Navigation from '../../components/navigation';
import styles from '../../styles/customer/Basket.module.scss';

import basketActions from '../../basketActions';
import routes from '../../routes';



const BasketPage = () => {
  const { basket, dispatch } = useContext(BasketContext);

  const getProductFromBasket = product => (
		basket.items.find(item => item.ProductID === product.ProductID)
	)

  const removeOneFromBasket = product => {
    dispatch({ type: basketActions.removeProduct, product: product });
  }

  const removeAllFromBasket = product => {
    dispatch({ type: basketActions.removeAllProduct, product: product });
  }

  const BasketItem = ({item}) => {
    return (
      <div>
        <Row>
					<Col>
						<Button variant="primary" onClick={() => removeAllFromBasket(item)}>X</Button>
					</Col>
          <Col>
            <p>
              <Card.Img className={styles.cardImage} variant="top" src={item.ImageURL} />
            </p>
          </Col>
				  <Col>
            <p>{item.Name}</p>
          </Col>
          <Col>
            <p>{item.Quantity}</p>
          </Col>
          <Col>
            <p>{item.Dimensions}</p>
          </Col>
          <Col>
            <p>{"£"+item.Price}</p>
          </Col>
        </Row>
      </div>
    )
  }
  
  const BasketGroup = ({ basket }) => {
		if (basket.items.length <= 0) return ( <Form><Form.Label>The basket is currently empty.</Form.Label></Form> )
		return (
			<div>
				{
          basket.items.map((item, i) => (
          <BasketItem item={item} key={i} />
          ))
        }
			</div>
		)
	}

  return (
    <div className={styles.container}>
      <Head>
        <title>Basket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />

        <Container className={styles.Container}>
          <Card className={styles.BasketCard}>
            <Card.Body>
              <Card.Title className="text-center">Basket</Card.Title>
              <BasketGroup basket={basket}/>

            </Card.Body>
          </Card>
        </Container>
        
        <pre>{JSON.stringify(basket, null, 2)}</pre>;
      </main>
    </div>
  )
}

export default BasketPage;
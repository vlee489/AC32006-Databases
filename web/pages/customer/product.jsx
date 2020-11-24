import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useMediaQuery } from 'react-responsive';
import { Breadcrumb, Card, Container, Button, Col, Row } from 'react-bootstrap';
import Navigation from '../../components/navigation';
import routes from '../../routes';
import styles from '../../styles/customer/Product.module.scss';

export default function Product() {
  const [basket, setBasket] = useState(Cookies.get('basket'));
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct({
      ProductID: 0,
      Name: "Shelf",
      Category: "Shelves",
      Price: 5,
      Dimensions: "2x2cm",
      Quantity: 1
    });
  }, []);

  const addToBasket = () => {
    // if (!basket) setBasket([]);
    // basket.push(product);
  }

  const SplitProductInfo = () => (
    <Row>
      <Col>
        <Card className={`${styles.card} my-4`}>
          <Card.Img className={styles.cardImage} variant="top" src="https://picsum.photos/720/400" />
        </Card>
      </Col>
      <Col>
        <Card className={`${styles.card} my-4`}>
          <Card.Body>
            <Card.Title>{product.Name}</Card.Title>
            <Card.Text>{`£${product.Price}`}</Card.Text>
            <Card.Text>{product.Dimensions}</Card.Text>
            <Button variant="primary" onClick={addToBasket}>Add to basket</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )

  const UnifiedProductInfo = () => (
    <Row>
      <Col>
        <Card className={`${styles.card} my-4`}>
          <Card.Img className={styles.cardImage} variant="top" src="https://picsum.photos/720/400" />
          <Card.Body>
            <Card.Title>{product.Name}</Card.Title>
            <Card.Text>{`£${product.Price}`}</Card.Text>
            <Card.Text>{product.Dimensions}</Card.Text>
            <Button variant="primary" onClick={addToBasket}>Add to basket</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )

  const ProductInfo = () => useMediaQuery({ query: '(min-width: 900px)' }) ? <SplitProductInfo /> : <UnifiedProductInfo />;

  return (
    <div className={styles.container}>
      <Head>
        <title>Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Row>
          <Col>
            <Breadcrumb>
              <Link href={routes.catalogue} passHref>
                <Breadcrumb.Item>
                  {product.Category}
                </Breadcrumb.Item>
              </Link>
            </Breadcrumb>
          </Col>
        </Row>
        <Container>
          <ProductInfo />
        </Container>
      </main>
    </div>
  )
}

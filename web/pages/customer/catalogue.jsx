import React, { useEffect, useState } from 'react';
import Head from 'next/head';
// import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import { Container, Row, Col, Card, FormControl, InputGroup, Button } from 'react-bootstrap';
import Navigation from '../../components/navigation';
// import { GET_PRODUCT } from '../../api/products';
import styles from '../../styles/customer/Catalogue.module.scss';

export default function Catalogue() {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);

  /*const cache = new InMemoryCache();

  const client = new ApolloClient({
    uri: 'http://168.119.243.209:4000/graphql',
    cache
  });

  const { loading, error, data } = useQuery(GET_PRODUCT);*/

  useEffect(() => {
    const testProducts = [];

    const testProduct = {
      name: "Shelf",
      image: "https://picsum.photos/360/200",
      price: "10",
      dimensions: "200x30x3cm"
    }

    for (let i = 0; i < 10; i++) {
      testProducts.push(testProduct);
    }

    setProducts(prevProducts => [...prevProducts, ...testProducts]);
  }, [])

  const Product = ({ name, image, price, dimensions }) => (
    <Col>
      <Card className={`${styles.product} my-4`}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{`£${price}`}</Card.Text>
          <Card.Text>{dimensions}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>GFFC Catalogue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Container>
          <Row>
            <Col>
              <InputGroup className="mb-3 pt-5">
                <FormControl
                  placeholder="Search products..."
                  aria-label="Search"
                  aria-describedby="search"
                  onChange={() => setSearchText(e.target.value)}
                />
                <InputGroup.Append>
                  <Button className="btn-primary">Search</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            {
              products.map((p, i) => <Product key={i} name={p.name} image={p.image} price={p.price} dimensions={p.dimensions} />)
            }
          </Row>
        </Container>
      </main>
    </div>
  )
}

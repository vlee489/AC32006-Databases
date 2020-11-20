import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { Container, Row, Col, Card, FormControl, InputGroup, Button } from 'react-bootstrap';
import Navigation from '../../components/navigation';

import { useQuery } from '@apollo/client';
import withGraphql from "../../libraries/apollo";
import GET_PRODUCTS from '../../queries/products';

import styles from '../../styles/customer/Catalogue.module.scss';

const Catalogue = () => {
  const [searchText, setSearchText] = useState("");

  const { loading, error, data } = useQuery(GET_PRODUCTS);

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

  const ProductsGroup = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{`${error}`}</p>;
    if (data) return data.getProducts.map((p, i) => <Product key={i} name={p.Name} image={p.Image} price={p.Price} dimensions={p.Dimensions} />)
    return <p>{`${data}`}</p>;
  }

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
            <ProductsGroup />
          </Row>
        </Container>
      </main>
    </div>
  )
}

export default withGraphql({ ssr: true })(Catalogue);
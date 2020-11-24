import Head from 'next/head';
import { Card, Row, Col } from 'react-bootstrap';

import { useQuery } from '@apollo/client';
import withApollo from "../libraries/apollo";

import categories from '../categories';
import Navigation from '../components/navigation';
import styles from '../styles/index.module.scss';
import { Container } from 'next/app';

// 1 - Shelves
// 2 - Plants
// 3 - Tables and Desks
// 4 - Sofas
// 5 - Refrigerators
// 6 - Timber
// 7 - Chairs
// 8 - Bedframes

const Browse = () => {

  const CategoryCard = ({categoryName, categoryImage}) => (
      <Col>
        <Card className={styles.category}>
          <Card.Img variant="top" src={categoryImage}></Card.Img>
          <Card.Body>
            <Card.Title href="" className="text-center">{categoryName}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
  )

  const GenerateCategoryCards = () => {
    let cats = []  
    for (const cat in categories) {
        cats.push(
          <CategoryCard categoryName={categories[cat].image, categories[cat].name}/>
        )
      }
    return cats
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Generic Flatpack Furniture</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <main className={styles.main}>
        <Navigation />
        <Container>
          <Row>
            <GenerateCategoryCards />
          </Row>
        </Container>
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(Browse);
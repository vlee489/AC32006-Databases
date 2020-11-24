import Head from 'next/head';
import { Card } from 'react-bootstrap';

import { useQuery } from '@apollo/client';
import withApollo from "../libraries/apollo";

import Navigation from '../components/navigation';
import styles from '../styles/index.module.scss';

// 1 - Shelves
// 2 - Plants
// 3 - Tables and Desks
// 4 - Sofas
// 5 - Refrigerators
// 6 - Timber
// 7 - Chairs
// 8 - Bedframes

const Browse = () => {

  const Category = () => (
      <Col>
        <Card className={`${styles.category}`}>
          <Card.Img> variant="top" src={image}</Card.Img>
          <Card.Body>
            <Card.Title href="">{categoryName}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Generic Flatpack Furniture</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <main className={styles.main}>
        <Navigation />
      </main>
    </div>
  )
}

export default withApollo({ ssr: false })(Browse);
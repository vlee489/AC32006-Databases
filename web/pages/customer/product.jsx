import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useMediaQuery } from 'react-responsive';
import { useQuery } from '@apollo/client';
import withApollo from "../../libraries/apollo";
import { Breadcrumb, Card, Container, Button, Col, Row } from 'react-bootstrap';

import Navigation from '../../components/navigation';
import Spinner from '../../components/spinner';
import GET_PRODUCT from '../../queries/product';
import categories from '../../categories';
import routes from '../../routes';
import styles from '../../styles/customer/Product.module.scss';

const Product = () => {
	const [basket, setBasket] = useState(Cookies.get('basket'));
	const { loading, error, data } = useQuery(GET_PRODUCT("1"));

	// const [product, setProduct] = useState({});

	// useEffect(() => {
	//   setProduct({
	//     ProductID: 0,
	//     Name: "Shelf",
	//     Category: "Shelves",
	//     Price: 5,
	//     Dimensions: "2x2cm",
	//     Quantity: 1
	//   });
	// }, []);

	const addToBasket = product => {

	}

	const SplitProductInfo = ({ product }) => (
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
						<Button variant="primary" onClick={() => addToBasket(product)}>Add to basket</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)

	const UnifiedProductInfo = ({ product }) => (
		<Row>
			<Col>
				<Card className={`${styles.card} my-4`}>
					<Card.Img className={styles.cardImage} variant="top" src="https://picsum.photos/720/400" />
					<Card.Body>
						<Card.Title>{product.Name}</Card.Title>
						<Card.Text>{`£${product.Price}`}</Card.Text>
						<Card.Text>{product.Dimensions}</Card.Text>
						<Button variant="primary" onClick={() => addToBasket(product)}>Add to basket</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)

	const ProductInfo = ({ product }) => {
		if (loading) return <Spinner />;
		if (error) return <p>{error}</p>;
		if (data) console.log(data);
		return useMediaQuery({ query: '(min-width: 900px)' }) ? <SplitProductInfo product={product} /> : <UnifiedProductInfo product={product} />;
	}

	const ProductGroup = () => {
		if (loading) return <Spinner />;
		if (error) return <p>{error}</p>;
		if (data) {
			const product = data.getProducts[0];

			return (
				<>
					<Row>
						<Col>
							<Breadcrumb>
								<Link href={routes.catalogue} passHref>
									<Breadcrumb.Item>
										{categories[1].name}
									</Breadcrumb.Item>
								</Link>
							</Breadcrumb>
						</Col>
					</Row>
					<Container>
						<ProductInfo product={product} />
					</Container>
				</>
			)
		}
		return <p>{`${data}`}</p>;
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Product</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Navigation />
				<ProductGroup />
			</main>
		</div>
	)
}

export default withApollo({ ssr: false })(Product);
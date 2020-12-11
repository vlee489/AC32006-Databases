import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { useQuery } from '@apollo/client';
import withApollo from "../../../libraries/apollo";
import BasketContext from '../../../contexts/basket';
import GET_PRODUCT from '../../../queries/product';

import { Breadcrumb, Card, Container, Button, Col, Row } from 'react-bootstrap';
import Navigation from '../../../components/navigation';
import Spinner from '../../../components/spinner';
import { useMediaQuery } from 'react-responsive';
import styles from '../../../styles/customer/Product.module.scss';

import basketActions from '../../../basketActions';
import categories from '../../../categories';
import routes from '../../../routes';

const Product = () => {
	const router = useRouter();
	const { productId } = router.query;
	const { loading, error, data } = useQuery(GET_PRODUCT(productId));
	const { basket, dispatch } = useContext(BasketContext);
	
	const addToBasket = product => {
		dispatch({ type: basketActions.addProduct, product: product });
	}

	const removeOneFromBasket = product => {
		dispatch({ type: basketActions.removeProduct, product: product });
	}

	const getProductFromBasket = product => (
		basket.items.find(item => item.ProductID === product.ProductID)
	)

	const isInBasket = product => {
		if (getProductFromBasket(product)) return true;
		return false;
	}

	const BasketModifier = ({ product }) => {
		if (!isInBasket(product)) return <Button variant="primary" onClick={() => addToBasket(product)}>Add to basket</Button>
		return (
			<div>
				<Row>
					<Col>
						<Button variant="primary" onClick={() => addToBasket(product)}>+</Button>
					</Col>
					<Col>
						<p>{getProductFromBasket(product).Quantity}</p>
					</Col>
					<Col>
						<Button variant="primary" onClick={() => removeOneFromBasket(product)}>-</Button>
					</Col>
				</Row>
			</div>
		)
	}

	const SplitProductInfo = ({ product }) => (
		<Row>
			<Col>
				<Card className={`${styles.card} my-4`}>
					<Card.Img className={styles.cardImage} variant="top" src={product.ImageURL} />
				</Card>
			</Col>
			<Col>
				<Card className={`${styles.card} my-4`}>
					<Card.Body>
						<Card.Title>{product.Name}</Card.Title>
						<Card.Text>{`£${product.Price}`}</Card.Text>
						<Card.Text>{product.Dimensions}</Card.Text>
						<BasketModifier product={product} />
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)

	const UnifiedProductInfo = ({ product }) => (
		<Row>
			<Col>
				<Card className={`${styles.card} my-4`}>
					<Card.Img className={styles.cardImage} variant="top" src={product.ImageURL} />
					<Card.Body>
						<Card.Title>{product.Name}</Card.Title>
						<Card.Text>{`£${product.Price}`}</Card.Text>
						<Card.Text>{product.Dimensions}</Card.Text>
						<BasketModifier product={product} />
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)

	const ProductInfo = ({ product }) => {
		if (loading) return <Spinner />;
		if (error) return null;
		return useMediaQuery({ query: '(min-width: 900px)' }) ? <SplitProductInfo product={product} /> : <UnifiedProductInfo product={product} />;
	}

	const ProductGroup = () => {
		if (loading) return <Spinner />;
		if (error) return <pre>{JSON.stringify(error)}</pre>;
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
						<Description product={product} />
					</Container>
				</>
			)
		}
		return <p>{`${data}`}</p>;
	}

	const Description = ({ product }) => {
		if (loading) return <Spinner />;
		if (error) return null;
		if (data) return <p>{product.Description}</p>;
		return null;
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
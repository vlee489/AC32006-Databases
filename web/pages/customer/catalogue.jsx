import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { useQuery } from '@apollo/client';
import withApollo from "../../libraries/apollo";
import GET_PRODUCTS from '../../queries/products';
import routes from '../../routes';

import categories from '../../categories';

import { Container, Row, Col, Card, Form, FormControl, InputGroup, Nav } from 'react-bootstrap';
import Navigation from '../../components/navigation';
import Sidebar from '../../components/sidebar';
import Spinner from '../../components/spinner';
import ToggleToken from '../../components/toggleToken';
import { FaSearch } from 'react-icons/fa';
import styles from '../../styles/customer/Catalogue.module.scss';

const Catalogue = () => {
	const [searchText, setSearchText] = useState("");

	const { loading, error, data } = useQuery(GET_PRODUCTS);

	const changeCategories = () => {

	}

	const Product = ({ productId, name, image, price, dimensions }) => (
		<Col>
			<Link href={`${routes.product}/${encodeURIComponent(productId)}`}>
				<Card className={`${styles.product} my-4`}>
					<Card.Img variant="top" width="100%" src="https://picsum.photos/360/200" />
					<Card.Body>
						<Card.Title>{name}</Card.Title>
						<Card.Text>{`£${price}`}</Card.Text>
						<Card.Text>{dimensions}</Card.Text>
					</Card.Body>
				</Card>
			</Link>
		</Col>
	)

	const ProductsGroup = () => {
		if (loading) return <Spinner />;
		if (error) return <p>{`${error}`}</p>;
		if (data) {
			const products = data.getProducts;
			const filteredProducts = products.filter(
				product => {
					if (!searchText) return true;
					else if (product.Name.toLowerCase().includes(searchText.toLowerCase())) return true;
				}
			);
			return (
				<Row>
					{filteredProducts.map(
						(p, i) => <Product key={i} productId={p.ProductID} name={p.Name} image={p.Image} price={p.Price} dimensions={p.Dimensions} />
					)}
				</Row>
			)
		}
		return <p>{`${data}`}</p>;
	}

	const CategoryToggles = () => {
		let jsx = [];
		let i = 0;

		for (const category in categories) {
			if (categories.hasOwnProperty(category)) {
				jsx.push(
					// <Col key={i}>
						<ToggleToken key={i} activeDefault={false} onClickFunc={changeCategories}>{categories[category].name}</ToggleToken>
					// </Col>
				);
				i++;
			}
		}

		return jsx;
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>GFFC Catalogue</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Navigation />
				<Sidebar />
				<Container>
					<Row>
						<Col>
							<InputGroup className="mb-3 pt-5">
								<InputGroup.Prepend>
									<InputGroup.Text>
										<FaSearch />
									</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl
									placeholder="Search products..."
									aria-label="Search"
									aria-describedby="search"
									onChange={e => setSearchText(e.target.value)}
								/>
							</InputGroup>
						</Col>
					</Row>
					{/* <Row> */}
					<div className="flexWrap">
						<CategoryToggles />
					</div>
					{/* </Row> */}
					<Row>
						<Col>
							<ProductsGroup />
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	)
}

export default withApollo({ ssr: false })(Catalogue);
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import withApollo from "../../libraries/apollo";
import GET_PRODUCTS from '../../queries/products';
import routes from '../../routes';
import categoriesJSON from '../../categoriesJSON.json';

import { Container, Row, Col, Card, FormControl, InputGroup } from 'react-bootstrap';
import Navigation from '../../components/navigation';
import Sidebar from '../../components/sidebar';
import Spinner from '../../components/spinner';
import ToggleToken from '../../components/toggleToken';
import { FaSearch } from 'react-icons/fa';
import styles from '../../styles/customer/Catalogue.module.scss';

const Catalogue = () => {
	const [searchText, setSearchText] = useState("");
	const [categories, setCategories] = useState([]);
	const router = useRouter();
	const { categoryDefault } = router.query;
	const { loading, error, data } = useQuery(GET_PRODUCTS);

	useEffect(() => {
		let categories = [];

		categoriesJSON.forEach(cat => {
			const category = {
				name: cat.name,
				number: cat.number,
				active: cat.name === categoryDefault
			}
			categories.push(category);
		})

		setCategories(categories);
	}, [categoryDefault])

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
			const activeCategories = categories.filter(category => category.active);
			const categoryFiltered = products.filter(
				product => {
					for (const category of activeCategories) {
						if (category.number === product.Category) return true;
					}
					return false;
				}
			);
			const searchFiltered = categoryFiltered.filter(
				product => {
					if (!searchText) return true;
					else if (product.Name.toLowerCase().includes(searchText.toLowerCase())) return true;
				}
			);
			return (
				<Row>
					{searchFiltered.map(
						(p, i) => <Product key={i} productId={p.ProductID} name={p.Name} image={p.Image} price={p.Price} dimensions={p.Dimensions} />
					)}
				</Row>
			)
		}
		return <p>{`${data}`}</p>;
	}

	const CategoryToggles = () => {
		let jsx = [];

		categories.forEach(category => {
			jsx.push(<ToggleToken
				key={category.number}
				name={category.name}
				number={category.number}
				active={category.active}
				toggle={() => setCategories(
					categoriesStore => {
						const newStore = JSON.parse(JSON.stringify(categoriesStore));
						const cat = newStore[category.number - 1];
						cat.active = !cat.active;
						return newStore;
					}
				)}
			/>)
		})

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
					<div className="flexWrap">
						<CategoryToggles />
					</div>
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
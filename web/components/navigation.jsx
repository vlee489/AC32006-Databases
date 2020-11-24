import React, { useContext } from 'react';

import Link from 'next/link';
import routes from '../routes';

import BasketContext from '../libraries/basket';
import UserContext from '../libraries/user';

import { Button, Form, FormControl, Nav, Navbar, NavDropdown, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import styles from "../styles/navigation.module.scss";

const Navigation = props => {
    const { basket, setBasket } = useContext(BasketContext);
    const { userToken, setUserToken } = useContext(UserContext);

    // const product = {
    //     ProductID: 0,
    //     Name: "Shelf",
    //     Category: "Shelves",
    //     Price: 5,
    //     Dimensions: "2x2cm",
    //     Quantity: 1
    //   }

    // let basketProducts = [];

    // basketProducts.push(product);

    // const BasketDropdowns = () => {
    //     return (
    //         // basketProducts.map((p, i) => {
    //             <Link href="" passHref>
    //                 <NavDropdown.Item className="product-item">
    //                     <Row>
    //                         <Col>
    //                             <img />
    //                         </Col>
    //                         <Col>
    //                             Product
    //                         </Col>
    //                         <Col>
    //                             Price
    //                         </Col>
    //                         <Col>
    //                             Quantity
    //                         </Col>
    //                         <Col>
    //                             <button>X</button>
    //                         </Col>
    //                     </Row>
    //                 </NavDropdown.Item>
    //             </Link>
    //         // })
    //     )
    // }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link href={routes.index} passHref>
                    <Navbar.Brand>
                        Generic Flatpack Furniture
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link href={routes.index} passHref>
                            <Nav.Link>Home</Nav.Link>
                        </Link>

                        <Link href={routes.catalogue} passHref>
                            <Nav.Link>Catalogue</Nav.Link>
                        </Link>
                        <Link href={routes.checkout} passHref>
                            <Nav.Link>Checkout</Nav.Link>
                        </Link>
                        <Link href={routes.product} passHref>
                            <Nav.Link>Product</Nav.Link>
                        </Link>
                        <NavDropdown title="Staff" id="staffDropdown">
                            <Link href={routes.login} passHref>
                                <NavDropdown.Item>Login</NavDropdown.Item>
                            </Link>
                            <Link href={routes.admin} passHref>
                                <NavDropdown.Item>Admin</NavDropdown.Item>
                            </Link>
                            <Link href={routes.inventory} passHref>
                                <NavDropdown.Item>Inventory</NavDropdown.Item>
                            </Link>
                            <Link href={routes.shift} passHref>
                                <NavDropdown.Item>Shift</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Nav>
                    <Nav className="nav-basket">
                        <NavDropdown alignRight className={styles.basketDropdown} title={<FontAwesomeIcon className="form-control-feedback" icon={faShoppingBasket} />} id="basket">
                            {/* <BasketDropdowns /> */}
                            <NavDropdown.Item>Checkout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navigation;
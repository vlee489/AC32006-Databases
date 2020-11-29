import React, { useContext } from 'react';
import Link from 'next/link';
import routes from '../routes';
import UserContext from '../contexts/user';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaShoppingBasket } from 'react-icons/fa';
import styles from "../styles/navigation.module.scss";

const Navigation = props => {
    const { userToken, setUserToken } = useContext(UserContext);

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
                        <NavDropdown alignRight className={styles.basketDropdown} title={<FaShoppingBasket />} id="basket">
                            <Link href={routes.basket} passHref>
                                <NavDropdown.Item>Basket</NavDropdown.Item>
                            </Link>
                            <Link href={routes.checkout} passHref>
                                <NavDropdown.Item>Checkout</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navigation;
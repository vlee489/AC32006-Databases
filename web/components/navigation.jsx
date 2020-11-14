import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import routes from '../routes';

const Navigation = props => {
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
                        <NavDropdown title="Customer" id="customerDropdown">
                            <Link href={routes.basket} passHref>
                                <NavDropdown.Item>Basket</NavDropdown.Item>
                            </Link>
                            <Link href={routes.catalogue} passHref>
                                <NavDropdown.Item>Catalogue</NavDropdown.Item>
                            </Link>
                            <Link href={routes.checkout} passHref>
                                <NavDropdown.Item>Checkout</NavDropdown.Item>
                            </Link>
                            <Link href={routes.product} passHref>
                                <NavDropdown.Item>Product</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
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
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navigation;
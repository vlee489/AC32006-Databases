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
                    <Nav className="">
                        <Link href={routes.basket} className="float-right" passHref>
                            <Nav.Link>Basket</Nav.Link>
                        </Link>
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
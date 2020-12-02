import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Cookies from 'js-cookie';
import routes from '../../routes';
import UserContext from '../../contexts/user';

const CustomerBar = () => {
    const { userToken, setUserToken } = useContext(UserContext);
    const router = useRouter();

    const logout = () => {
        if (typeof window !== 'undefined') {
            Cookies.remove('userToken');
            setUserToken(null);
            router.push(routes.index);
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link href={routes.index} passHref>
                <Navbar.Brand>
                    Generic Flatpack Furniture
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link href={routes.admin} passHref>
                        <Nav.Link>Admin</Nav.Link>
                    </Link>
                    <Link href={routes.inventory} passHref>
                        <Nav.Link>Inventory</Nav.Link>
                    </Link>
                    <Link href={routes.shift} passHref>
                        <Nav.Link>Shift</Nav.Link>
                    </Link>
                </Nav>
                <Nav>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default CustomerBar;
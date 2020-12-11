import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Nav, Navbar } from 'react-bootstrap';
import routes from '../../routes';
import UserContext from '../../contexts/user';
import { Brand, NavLink } from './sharedNav';
import Cookies from 'js-cookie';

const CustomerBar = () => {
    const { _, setUserToken } = useContext(UserContext);
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
            <Brand />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink title="Admin" route={routes.admin} /> 
                    <NavLink title="Inventory" route={routes.inventory} /> 
                    <NavLink title="Shift" route={routes.shift} /> 
                    <NavLink title="Purchases" route={routes.purchases} /> 
                </Nav>
                <Nav>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default CustomerBar;
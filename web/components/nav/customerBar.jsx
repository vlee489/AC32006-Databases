import Link from 'next/link';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaShoppingBasket } from 'react-icons/fa';
import categories from '../../categories';
import routes from '../../routes';
import { Brand, NavLink } from './sharedNav';

const CategoryLink = ({ categoryName }) => (
    <Link href={{ pathname: routes.catalogue, query: { categoryDefault: categoryName } }} passHref>
        <Nav.Link>{categoryName}</Nav.Link>
    </Link>
)

const CategoryLinkGroup = () => {
    let cats = [];
    for (const cat in categories) {
        cats.push(
            <CategoryLink key={cats.length} categoryName={categories[cat].name} />
        )
    }
    return cats;
}

const CustomerBar = () => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Brand />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <CategoryLinkGroup />
                <NavLink title="Staff Login" route={routes.login} />
            </Nav>
            <Nav className="nav-basket">
                <NavDropdown alignRight title={<FaShoppingBasket />} id="dropdown-basket">
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
)

export default CustomerBar;
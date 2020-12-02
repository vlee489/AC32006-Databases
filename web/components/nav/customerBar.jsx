import { useContext } from 'react';
import Link from 'next/link';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaShoppingBasket } from 'react-icons/fa';
import categories from '../../categories';
import routes from '../../routes';
import BasketContext from '../../contexts/basket';


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

const CustomerBar = () => {
    const { basket, dispatch } = useContext(BasketContext);

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
                    <CategoryLinkGroup />
                    <Link href={routes.login} passHref>
                        <Nav.Link>Staff Login</Nav.Link>
                    </Link>
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
}

export default CustomerBar;
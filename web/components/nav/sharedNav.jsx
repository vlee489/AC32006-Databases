import Link from 'next/link';
import { Nav, Navbar } from 'react-bootstrap';
import routes from '../../routes';

export const Brand = () => (
    <Link href={routes.index} passHref>
        <Navbar.Brand>Generic Flatpack Furniture</Navbar.Brand>
    </Link>
)

export const NavLink = ({title, route}) => (
    <Link href={route} passHref>
        <Nav.Link>{title}</Nav.Link>
    </Link>
)
import { useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import UserContext from '../contexts/user';
import CustomerBar from './nav/customerBar';
import StaffBar from './nav/staffBar';

const Navigation = props => {
    const { userToken, setUserToken } = useContext(UserContext);

    useEffect(() => {
        const cookies = Cookies.get();
        if (cookies && cookies.userToken) setUserToken(JSON.parse(cookies.userToken));
    }, [])

    if (userToken) return <StaffBar />;
    return <CustomerBar />;
}

export default Navigation;
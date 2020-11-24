import React, { useMemo, useState } from 'react';
import BasketContext from '../libraries/basket';
import UserContext from '../libraries/user';

import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp = ({ Component, pageProps }) => {
	const [basket, setBasket] = useState("hello from context");
	const [userToken, setUserToken] = useState(null);

	const basketProvider = useMemo(() => ({ basket, setBasket }), [basket, setBasket]);
	const userProvider = useMemo(() => ({ userToken, setUserToken }), [userToken, setUserToken]);

	return (
		<BasketContext.Provider value={basketProvider}>
			<UserContext.Provider value={userProvider}>
				<Component {...pageProps} />
			</UserContext.Provider>
		</BasketContext.Provider>
	)
}

export default MyApp;

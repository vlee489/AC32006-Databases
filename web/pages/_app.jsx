import React, { useMemo, useState, useReducer } from 'react';

import BasketContext from '../contexts/basket';
import UserContext from '../contexts/user';

import { basketInit, basketReducer } from "../libraries/basket";

import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp = ({ Component, pageProps }) => {
	const [basket, dispatch] = useReducer(basketReducer, basketInit);
	const basketProvider = useMemo(() => ({ basket, dispatch }), [basket, dispatch]);

	// const [basket, setBasket] = useState("hello from context");
	// const basketProvider = useMemo(() => ({ basket, setBasket }), [basket, setBasket]);

	const [userToken, setUserToken] = useState(null);	
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

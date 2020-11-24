import React, { createContext } from 'react';
import Cookies from 'js-cookie';

/* This code is adapted from here: 
    https://github.com/AlexSegen/react-shopping-cart/blob/master/src/contexts/CartContext.js
*/

export const BasketContext = createContext([]);

export const storage = () => {
    const store = Cookies.get('basket');
    if (!store) return [];
    return store;
}

export const setStorage = storage => localStorage.setItem('basket', JSON.stringify(storage));

export const BasketProvider = ({ children }) => (
    <BasketContext.Provider>
        { children }
    </BasketContext.Provider>
);

export default BasketProvider;
/* This code is adapted from here: 
    https://github.com/AlexSegen/react-shopping-cart/blob/master/src/contexts/CartContext.js
*/

export const BasketContext = createContext([]);

export const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

export const setStorage = storage => localStorage.setItem('cart', JSON.stringify(storage));

export const BasketProvider = ({ children }) => (
    <BasketContext.Provider>
        { children }
    </BasketContext.Provider>
);

export default BasketProvider;
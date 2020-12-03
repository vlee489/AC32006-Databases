import basketActions from "../basketActions";
import Cookies from 'js-cookie';

const basketEmpty = { items: [], totalCost: 0 }

export const basketInit = () => { 
    const cookies = Cookies.get();
    try {
        if (!cookies || !cookies.basket) throw new Error();
        return JSON.parse(cookies.basket);
    } catch (error) {
        return basketEmpty;
    }
};

export const basketReducer = (state, action) => {
    let basket = state;
    debugger;
    switch (action.type) {
        case basketActions.addProduct:
            basket = addProduct(state, action);
            break;

        case basketActions.removeProduct:
            basket = removeProduct(state, action);
            break;

        case basketActions.removeAllProduct:
            basket = removeAllProduct(state, action);
            break;

        case basketActions.clearBasket:
            basket = basketEmpty;
            break;

        default:
            const msg = `Basket Action ${action.type} is not a thing
            Look at the basketActions.js file to choose a correct action`;
            console.error(msg);
    }

    Cookies.set('basket', basket);
    return basket;
}

const addProduct = (state, action) => {
    if (!action.product) {
        console.error("You need to pass a product to add");
        return state;
    }

    // Deep copies new product and the basket's current items
    const newProduct = JSON.parse(JSON.stringify(action.product));
    const newItems = JSON.parse(JSON.stringify(state.items));

    const currentProduct = newItems.find(item => item.ProductID === action.product.ProductID);

    let quantity = 1;
    if (action.product.Quantity) quantity = action.product.quantity;

    if (!currentProduct) {
        newProduct.Quantity = quantity;
        newItems.push(newProduct);
    }
    else currentProduct.Quantity += quantity;

    return {
        items: newItems,
        totalCost: calcCosts(newItems)
    }
}

const removeProduct = (state, action) => {
    if (!action.product || !action.product.ProductID) {
        console.error("You need to pass a product to remove with a valid ProductID");
        return state;
    }

    // Deep copies new product and the basket's current items
    const newItems = JSON.parse(JSON.stringify(state.items));
    const currentProduct = newItems.find(item => item.ProductID === action.product.ProductID);

    if (!currentProduct) {
        console.log("Product passed in as parameter was not found in the basket");
        return state;
    }

    currentProduct.Quantity--;

    if (currentProduct.Quantity <= 0) {
        const pIndex = newItems.findIndex(item => item.ProductID === action.product.ProductID);
        newItems.splice(pIndex, 1);
    }

    return {
        items: newItems,
        totalCost: calcCosts(newItems)
    }
}

const removeAllProduct = (state, action) => {
    if (!action.product || !action.product.ProductID) {
        console.error("You need to pass a product to remove with a valid ProductID");
        return state;
    }

    // Deep copies new product and the basket's current items
    const newItems = JSON.parse(JSON.stringify(state.items));
    const currentProduct = newItems.find(item => item.ProductID === action.product.ProductID);

    if (!currentProduct) {
        console.log("Product passed in as parameter was not found in the basket");
        return state;
    }

    const pIndex = newItems.findIndex(item => item.ProductID === action.product.ProductID);
    newItems.splice(pIndex, 1);

    return {
        items: newItems,
        totalCost: calcCosts(newItems)
    }
}

const calcCosts = (items) => {
    let totalCost = 0;

    items.map(item => {
        item.SubTotal = item.Quantity * item.Price;
        totalCost += item.SubTotal;
    })

    return totalCost;
}
import basketActions from "../basketActions";
import product from "../pages/customer/product";

export const basketInit = { items: [], totalCost: 0 };

export const basketReducer = (state, action) => {
    switch (action.type) {
        case basketActions.addProduct:
            return addProduct(state, action);

        case basketActions.removeProduct:
            return removeProduct(state, action);

        case basketActions.removeAllProduct:
            return removeAllProduct(state, action);

        case basketActions.clearBasket:
            return basketInit();

        default:
            const msg = `Basket Action ${action.type} is not a thing
            Look at the basketActions.js file to choose a correct action`;
            console.error(msg);
            return state;
    }
}

const addProduct = (state, action) => {
    if (!action.product) return state;
    const newProduct = JSON.parse(JSON.stringify(action.product));
    const newItems = JSON.parse(JSON.stringify(state.items));

    const currentProduct = newItems.find(item => item.ProductID === action.product.ProductID);
    
    if (currentProduct) {
        let quantity = 1;
        if (action.product.Quantity) quantity = action.product.quantity;
        currentProduct.Quantity += quantity;
    }
    else {
        newProduct.Quantity = 1;
        newItems.push(newProduct);
    }

    const newState = {
        items: newItems,
        totalCost: 0
    }
    return newState;
}

const removeProduct = (state, action) => {
    if (!action.product || !action.product.ProductID) return state;
    const newItems = JSON.parse(JSON.stringify(state.items));
    
    const currentProduct = newItems.find(item => item.ProductID === action.product.ProductID);

    if (currentProduct) {
        currentProduct.Quantity = currentProduct.Quantity - 1;
        if (currentProduct.Quantity <= 0) {
            const pIndex = newItems.findIndex(item => item.ProductID === action.product.ProductID);
            newItems.splice(pIndex, 1);
        }
    }

    const newState = {
        items: newItems,
        totalCost: 0
    }
    return newState;
}

const removeAllProduct = (state, action) => {
    let productId = null;

    if (action.productId) productId = action.productId;
    else if (action.product && action.product.ProductID) productId = action.product.ProductID;
    else return state;

    const pIndex = state.items.findIndex(item => item.ProductID === action.product.ProductID);
    if (pIndex) delete state.item[pIndex];
    return state;
}

const calcCost = (items) => {
    let totalCost = 0;
    items.map(product => {
        product.SubTotal = product.Quantity * product.Cost;
        totalCost += product.SubTotal;
    })
    return totalCost;
}
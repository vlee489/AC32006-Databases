import basketActions from "../basketActions";

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

    const currentProduct = state.items.find(item => item.ProductID === action.product.ProductID);

    if (currentProduct) currentProduct.Quantity = currentProduct.Quantity + action.product.Quantity;
    else state.items.push(action.product);

    return state;
}

const removeProduct = (state, action) => {
    let productId = null;

    if (action.productId) productId = action.productId;
    else if (action.product && action.product.ProductID) productId = action.product.ProductID;
    else return state;

    const currentProduct = state.items.find(item => item.ProductID === action.product.ProductID);

    if (currentProduct) {
        currentProduct.Quantity = currentProduct.Quantity - 1;

        if (currentProduct.Quantity <= 0) {
            const pIndex = state.items.findIndex(item => item.ProductID === action.product.ProductID);
            delete state.item[pIndex];
        }
    }

    return state;
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
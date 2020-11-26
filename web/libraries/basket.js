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
    if (!action.product) {
        console.error("You need to pass a product to add");
        return state;
    }
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
        totalCost: calcCost(newItems)
    }
    return newState;
}

const removeProduct = (state, action) => {
    if (!action.product || !action.product.ProductID) {
        console.error("You need to pass a product to remove with a valid ProductID");
        return state;
    }

    const newItems = JSON.parse(JSON.stringify(state.items));
    const currentProduct = newItems.find(item => item.ProductID === action.product.ProductID);

    if (!currentProduct) {
        console.log("Product passed in as parameter was not found in the basket");
        return state;
    }

    currentProduct.Quantity = currentProduct.Quantity - 1;

    if (currentProduct.Quantity <= 0) {
        const pIndex = newItems.findIndex(item => item.ProductID === action.product.ProductID);
        newItems.splice(pIndex, 1);
    }

    const newState = {
        items: newItems,
        totalCost: 0
    }
    
    return newState;
}

const removeAllProduct = (state, action) => {
    if (!action.product || !action.product.ProductID) {
        console.error("You need to pass a product to remove with a valid ProductID");
        return state;
    }

    const newItems = JSON.parse(JSON.stringify(state.items));
    const currentProduct = newItems.find(item => item.ProductID === action.product.ProductID);

    if (!currentProduct) {
        console.log("Product passed in as parameter was not found in the basket");
        return state;
    }

    const pIndex = newItems.findIndex(item => item.ProductID === action.product.ProductID);
    newItems.splice(pIndex, 1);

    const newState = {
        items: newItems,
        totalCost: 0
    }

    return newState;
}

const calcCost = (items) => {
    let totalCost = 0;

    items.map(item => {
        item.SubTotal = item.Quantity * item.Price;
        totalCost += item.SubTotal;
    })

    return totalCost;
}
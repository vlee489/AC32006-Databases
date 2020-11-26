export default {
    /* 
        Adds a product to the basket or increments the product stored
        This can be used to add more than one quantity of a product
    */
    addProduct: "ADD",
    /* 
        Removes one quantity from the chosen item 
        Will remove the item if the quantity falls to at or below 0
    */
    removeProduct: "REMOVE",
    // Removes all quantities of the chosen item
    removeAllProduct: "REMOVE_ALL",
    // Clears the basket of items
    clearBasket: "CLEAR"
}
export default {
    /* 
        Adds or increments a product stored or added to the basket
        This can be used to add more than one quantity of a product
    */
    addProduct: "ADD",
    /* 
        Removes one of the chosen item 
        Will remove the item if the quantity falls at or below 0
    */
    removeProduct: "REMOVE",
    // Removes all quantities of the chosen item
    removeAllProduct: "REMOVE_ALL",
    // Clears the basket of items
    clearBasket: "CLEAR"
}
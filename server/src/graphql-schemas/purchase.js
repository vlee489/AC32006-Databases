const { gql, ForbiddenError, UserInputError } = require('apollo-server-express');
const { Branch } = require('../models/branch');
const { Products } = require('../models/products');
const { Inventory } = require('../models/inventory');
const { Purchases } = require('../models/purchases');
const { ProductPurchases } = require('../models/productPurchases');

const typeDefs = gql`
    "Represents a entry of product ordered in a Purchase"
    type PurchaseItem{
        Product: Product
        Qty: Int
    }

    "Represents a Customer purchase"
    type Purchase{
        PurchaseID: ID
        CustomerFirstName: String
        CustomerLastName: String
        BillingAddress: String
        DeliveryAddress: String
        Paid: Boolean
        TotalPrice: Float
        Dispatched: Boolean
        Branch: Branch
        Products: [PurchaseItem]
    }

    extend type Query{
        "Get a purchase as a customer"
        getPurchase(
            PurchaseID: ID!, 
            CustomerFirstName: String!, 
            CustomerLastName: String!
        ): Purchase

        "Get the purchase orders per branch"
        getBranchPurchases(
            BranchID: ID!
            Dispatched: Boolean
        ): [Purchase]
    }

    "Product and Qty required for an order"
    input ProductOrder{
        ProductID: ID,
        Qty: Int
    } 

    extend type Mutation{
        "Add an order to the system as a customer"
        createPurchase(
            "Branch you want to order from"
            Branch: ID!
            CustomerFirstName: String!
            CustomerLastName: String!
            BillingAddress: String!
            DeliveryAddress: String!
            Products: [
                ProductOrder
            ]!
        ): Purchase
        "Set dispatch of a Purchase"
        dispatchPurchase(
            PurchaseID: ID!
            Dispatched: Boolean!
        ): Purchase
    }
`;

const resolvers = {
    Query: {
        getPurchase: async (parent, arg, ctx, info) => {
            purchaseQuery = await Purchases.query().findById(arg.PurchaseID)
            if (purchaseQuery instanceof Purchases) {
                // Check if details match
                if ((purchaseQuery.CustomerFirstName != arg.CustomerFirstName) || (purchaseQuery.CustomerLastName != arg.CustomerLastName)) {
                    throw new UserInputError(
                        'Invalid Purchase Details', { invalidArgs: Object.keys(arg) }
                    )
                }
                // Building reply
                purchaseProductQuery = await ProductPurchases.query().where('PurchaseID', arg.PurchaseID)
                // Get products to reply with
                replyProducts = []
                for (const item in purchaseProductQuery) {
                    inventoryQuery = await Inventory.query().findById(purchaseProductQuery[item].InventoryID)
                    replyProducts.push({
                        Qty: purchaseProductQuery[item].QTY,
                        Product: (await Products.query().findById(inventoryQuery.ProductID))
                    })
                }
                // Builds return
                return {
                    PurchaseID: purchaseQuery.PurchaseID,
                    CustomerFirstName: purchaseQuery.CustomerFirstName,
                    CustomerLastName: purchaseQuery.CustomerLastName,
                    BillingAddress: purchaseQuery.BillingAddress,
                    DeliveryAddress: purchaseQuery.DeliveryAddress,
                    Paid: purchaseQuery.Paid,
                    TotalPrice: purchaseQuery.TotalPrice,
                    Dispatched: purchaseQuery.Dispatched,
                    Branch: (await Branch.query().findById(purchaseQuery.BranchID)),
                    Products: replyProducts,
                }
            } else {
                throw new UserInputError(
                    'Purchase does not exist', { invalidArgs: Object.keys(arg) }
                )
            }
        },

        getBranchPurchases: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                // Check if branch exists
                branchQuery = await Branch.query().findById(arg.BranchID)
                if (!(branchQuery instanceof Branch)) {
                    throw new UserInputError(
                        'Branch does not exist', { invalidArgs: Object.keys(arg) }
                    )
                }
                // Builds query for purchases
                purchaseQuery = Purchases.query().where('BranchID', arg.BranchID)
                if ('Dispatched' in arg) {  // If dispatched has been specified in query
                    purchaseQuery = purchaseQuery.where('Dispatched', arg.Dispatched)
                }
                purchaseQuery = await purchaseQuery
                reply = [] // Array to hold reply to return

                for (const item in purchaseQuery) {
                    purchaseProductQuery = await ProductPurchases.query().where('PurchaseID', purchaseQuery[item].PurchaseID)
                    // Get products to reply with
                    replyProducts = []
                    for (const item in purchaseProductQuery) {
                        inventoryQuery = await Inventory.query().findById(purchaseProductQuery[item].InventoryID)
                        replyProducts.push({
                            Qty: purchaseProductQuery[item].QTY,
                            Product: (await Products.query().findById(inventoryQuery.ProductID))
                        })
                    }
                    reply.push({
                        PurchaseID: purchaseQuery[item].PurchaseID,
                        CustomerFirstName: purchaseQuery[item].CustomerFirstName,
                        CustomerLastName: purchaseQuery[item].CustomerLastName,
                        BillingAddress: purchaseQuery[item].BillingAddress,
                        DeliveryAddress: purchaseQuery[item].DeliveryAddress,
                        Paid: purchaseQuery[item].Paid,
                        TotalPrice: purchaseQuery[item].TotalPrice,
                        Dispatched: purchaseQuery[item].Dispatched,
                        Branch: branchQuery, // As this queury is ever for one branch, we can reuse the same branch query
                        Products: replyProducts,
                    })
                }
                return reply
            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        },
    },

    Mutation: {
        createPurchase: async (parent, arg, ctx, info) => {
            /*
            In Theory IRL you would also have a check in place to make sure that the payment went
            through via service like Stripe (A payment gateway), also if any of the checks failed 
            and a payment was already taken you would initate a refund here as well. 
            We haven't added and logic or fields for said infomation here.
            */
            // Check if branch exists in system
            branchQuery = await Branch.query().findById(arg.Branch)
            if (!(branchQuery instanceof Branch)) {
                throw new UserInputError(
                    'Branch does not exist', { invalidArgs: Object.keys(arg) }
                )
            }
            // Check product and stock of product in branch &  tabulate order cost
            purchaseProductStore = [] // Place to store products
            purchaseTotalCost = 0.0 // Stores total cost
            for (const item in arg.Products) {
                productQuery = await Products.query().findById(arg.Products[item].ProductID)
                if (productQuery instanceof Products) {
                    // Check Inventory and stock exist for branch
                    inventoryQuery = await Inventory.query().where('BranchID', arg.Branch).where('ProductID', productQuery.ProductID)
                    if (inventoryQuery.length > 1) {
                        throw new Error(
                            `Internal Error on Product: ${arg.Products[item].ProductID} Branch: ${arg.Branch}`
                        )
                    } else if (inventoryQuery.length == 1) {
                        // check if inventory of branch is enough to process order
                        if (inventoryQuery[0].QTY >= arg.Products[item].Qty) {
                            // We add the product to the array if we have enough product to proces the order
                            purchaseProductStore.push({
                                InventoryID: inventoryQuery[0].InventoryID,
                                QTY: arg.Products[item].Qty
                            })
                            // Add item to total cost of purchase
                            purchaseTotalCost = purchaseTotalCost + (productQuery.Price * arg.Products[item].Qty)
                        } else {
                            throw new UserInputError(
                                `Branch does not have enough stock of ${arg.Products[item].ProductID}`, { invalidArgs: Object.keys(arg) }
                            )
                        }
                    } else {
                        throw new UserInputError(
                            `Product: ${arg.Products[item].ProductID} not stocked by branch`, { invalidArgs: Object.keys(arg) }
                        )
                    }
                } else {
                    throw new UserInputError(
                        `Product: ${arg.Products[item].ProductID} does not exist`, { invalidArgs: Object.keys(arg) }
                    )
                }
            }
            // Create the order
            purchaseInsert = await Purchases.query().insertGraphAndFetch({
                CustomerFirstName: arg.CustomerFirstName,
                CustomerLastName: arg.CustomerLastName,
                BillingAddress: arg.BillingAddress,
                DeliveryAddress: arg.DeliveryAddress,
                Paid: true,
                TotalPrice: purchaseTotalCost,
                BranchID: arg.Branch,
                Dispatched: false,
                // This create the entries in the productPurchases as a nested insert with relationships we specified in DB models
                productPurchases: purchaseProductStore
            })
            if (purchaseInsert instanceof Purchases) {
                // Build reply
                replyProducts = [] //Holds products
                for (const item in purchaseInsert.productPurchases) { //For each product in the purchase order
                    replyProducts.push({
                        Product: (await Products.query().findById((await Inventory.query().findById(purchaseInsert.productPurchases[item].InventoryID)).ProductID)),
                        Qty: purchaseInsert.productPurchases[item].QTY
                    })
                }
                return {
                    PurchaseID: purchaseInsert.PurchaseID,
                    CustomerFirstName: purchaseInsert.CustomerFirstName,
                    CustomerLastName: purchaseInsert.CustomerLastName,
                    BillingAddress: purchaseInsert.BillingAddress,
                    DeliveryAddress: purchaseInsert.DeliveryAddress,
                    Paid: purchaseInsert.Paid,
                    TotalPrice: purchaseInsert.TotalPrice,
                    Dispatched: purchaseInsert.Dispatched,
                    Branch: branchQuery,
                    Products: replyProducts,
                }
            } else {
                throw new Error(
                    "Internal error create Purchase Order"
                )
            }
        },
        dispatchPurchase: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                purchaseQuery = await Purchases.query().findById(arg.PurchaseID)
                if (!(purchaseQuery instanceof Purchases)) {
                    throw new UserInputError(
                        'Purchase does not exist', { invalidArgs: Object.keys(arg) }
                    )
                }
                purchaseQuery = await Purchases.query().patchAndFetchById(arg.PurchaseID, {Dispatched: arg.Dispatched})
                // Building reply
                purchaseProductQuery = await ProductPurchases.query().where('PurchaseID', arg.PurchaseID)
                // Get products to reply with
                replyProducts = []
                for (const item in purchaseProductQuery) {
                    inventoryQuery = await Inventory.query().findById(purchaseProductQuery[item].InventoryID)
                    replyProducts.push({
                        Qty: purchaseProductQuery[item].QTY,
                        Product: (await Products.query().findById(inventoryQuery.ProductID))
                    })
                }
                // Builds return
                return {
                    PurchaseID: purchaseQuery.PurchaseID,
                    CustomerFirstName: purchaseQuery.CustomerFirstName,
                    CustomerLastName: purchaseQuery.CustomerLastName,
                    BillingAddress: purchaseQuery.BillingAddress,
                    DeliveryAddress: purchaseQuery.DeliveryAddress,
                    Paid: purchaseQuery.Paid,
                    TotalPrice: purchaseQuery.TotalPrice,
                    Dispatched: purchaseQuery.Dispatched,
                    Branch: (await Branch.query().findById(purchaseQuery.BranchID)),
                    Products: replyProducts,
                }

            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        }
    }
}

module.exports = {
    Purchase: typeDefs,
    PurchaseResolvers: resolvers,
}
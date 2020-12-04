const { gql, ForbiddenError, UserInputError } = require('apollo-server-express');
const { IdError } = require('../func/errors');
const { Branch } = require('../models/branch');
const { OrderProducts } = require('../models/orderProducts');
const { Orders } = require('../models/orders');
const { Products } = require('../models/products');
const { Warehouse } = require('../models/warehouse');
const { WarehouseProducts } = require('../models/warehouseProducts');

const typeDefs = gql`
    "Details of an order from a warehouse"
    type WarehouseOrder{
        OrderID: ID
        Warehouse: Warehouse
        Branch: Branch
        OrderDate: String
        Status: Int
        Products: [OrderItem]
    }

    extend type Query{
        "Get the orders branch has put into warehouses"
        getBranchWarehouseOrders(
            BranchID: ID!
            Status: Int
        ): [WarehouseOrder]

        "Get orders to a Warehouse"
        getWarehouseOrders(
            WarehouseID: ID!
            Status: Int
        ): [WarehouseOrder]
    }

    extend type Mutation {
        createOrder(
            WarehouseID: ID!
            BranchID: ID!
            Status: Int!
            Products: [ProductOrder]!
        ): WarehouseOrder
    }
`;
const resolvers = {
    Query: {
        getWarehouseOrders: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                warehouseQuery = await Warehouse.query().findById(arg.WarehouseID)
                if (!(warehouseQuery instanceof Warehouse)) {
                    throw new IdError(
                        'Warehouse does not exist', { invalidArgs: Object.keys(arg) }
                    )
                }
                // Query for orders
                orderQuery = Orders.query().where('WarehouseID', arg.WarehouseID)
                // If query specifed a status
                if ('Status' in arg) {
                    orderQuery = orderQuery.where('Status', arg.Status)
                }
                orderQuery = await orderQuery
                //Build reply
                reply = []
                for (const item in orderQuery) {
                    orderItems = []
                    // Get products
                    orderProductQuery = await OrderProducts.query().where('OrderID', orderQuery[item].OrderID)
                    for (const x in orderProductQuery) {
                        orderItems.push({
                            Product: (await Products.query().findById(orderProductQuery[x].ProductID)),
                            Qty: orderProductQuery[x].QTY
                        })
                    }
                    // Build response for this order and push to reply array
                    reply.push({
                        OrderID: orderQuery[item].OrderID,
                        Status: orderQuery[item].Status,
                        OrderDate: (orderQuery[item].OrderDate).toISOString(),
                        Branch: (await Branch.query().findById(orderQuery[item].BranchID)),
                        Warehouse: warehouseQuery,
                        Products: orderItems
                    })
                }
                return reply
            } else {
                throw new ForbiddenError(
                    'Authentication token is invalid, please log in'
                )
            }
        },

        getBranchWarehouseOrders: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                branchQuery = await Branch.query().findById(arg.BranchID)
                // Check if branch exists
                if (!(branchQuery instanceof Branch)) {
                    throw new IdError(
                        'Branch does not exist', { invalidArgs: Object.keys(arg) }
                    )
                }
                // Query for orders
                orderQuery = Orders.query().where('BranchID', arg.BranchID)
                // If query specifed a status
                if ('Status' in arg) {
                    orderQuery = orderQuery.where('Status', arg.Status)
                }
                orderQuery = await orderQuery
                reply = [] // Holds reply
                for (const item in orderQuery) {  // For each order in the query
                    orderItems = []
                    // Get products
                    orderProductQuery = await OrderProducts.query().where('OrderID', orderQuery[item].OrderID)
                    for (const x in orderProductQuery) {
                        orderItems.push({
                            Product: (await Products.query().findById(orderProductQuery[x].ProductID)),
                            Qty: orderProductQuery[x].QTY
                        })
                    }
                    // Build response for this order and push to reply array
                    reply.push({
                        OrderID: orderQuery[item].OrderID,
                        Status: orderQuery[item].Status,
                        OrderDate: (orderQuery[item].OrderDate).toISOString(),
                        Branch: branchQuery,
                        Warehouse: (await Warehouse.query().findById(orderQuery[item].WarehouseID)),
                        Products: orderItems
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
        createOrder: async (parent, arg, ctx, info) => {
            if (ctx.auth) {
                const now = new Date(); // Get datetime
                // Check if Warehouse and Branch exist
                branchQuery = await Branch.query().findById(arg.BranchID)
                warehouseQuery = await Warehouse.query().findById(arg.WarehouseID)
                if (!(branchQuery instanceof Branch) || !(warehouseQuery instanceof Warehouse)) {
                    throw new IdError('Warehouse or Branch does not exist', { invalidArgs: Object.keys(arg) })
                }
                orderProducts = []  // Used to do the final reply
                orderProductInsert = []  //Used for created the orderProduct link for the insert and updating the stock level
                for (const i in arg.Products) {
                    // Check if product Exists
                    productQuery = await Products.query().findById(arg.Products[i].ProductID)
                    if (!(productQuery instanceof Products)) {
                        throw new IdError(`Product does not exist, ProductID:${arg.Products[i].ProductID}`, { invalidArgs: Object.keys(arg) })
                    }
                    warehouseProductQuery = await WarehouseProducts.query().where('WarehouseID', arg.WarehouseID).where('ProductID', arg.Products[i].ProductID)
                    if (warehouseQuery.length == 0) {
                        throw new IdError(`Warehouse does not stock ProductID:${arg.Products[i].ProductID}`, { invalidArgs: Object.keys(arg) })
                    }
                    if (warehouseProductQuery[0].QTY < arg.Products[i].Qty) {
                        throw new IdError(`Warehouse does not have enough stock of ProductID:${arg.Products[i].ProductID}`, { invalidArgs: Object.keys(arg) })
                    }
                    orderProducts.push({
                        Product: productQuery,
                        Qty: arg.Products[i].Qty,
                        WarehouseProductID: warehouseProductQuery[0].WarehouseProductID
                    })
                    orderProductInsert.push({
                        ProductID: arg.Products[i].ProductID,
                        QTY: arg.Products[i].Qty,
                    })
                }

                // Create the order
                orderInsert = await Orders.query().insertGraphAndFetch({
                    BranchID: arg.BranchID,
                    WarehouseID: arg.WarehouseID,
                    OrderDate: now,
                    Status: arg.Status,
                    orderProducts: orderProductInsert, //Inserts using graph relation specified in models
                })
                if(orderInsert instanceof Orders){
                    // Update stock level of warehouse
                    for(const i in orderProducts){
                        warehouseProductUpdate = await WarehouseProducts.query().findById(orderProducts[i].WarehouseProductID).decrement('QTY', orderProducts[i].Qty)
                    }
                    return{
                        OrderID: orderInsert.OrderID,
                        Status: orderInsert.Status,
                        OrderDate: orderInsert.OrderDate.toISOString(),
                        Branch: branchQuery,
                        Warehouse: warehouseQuery,
                        Products: orderProducts
                    }
                }else{
                    throw new Error("Internal Error in create order!")
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
    Order: typeDefs,
    InternalOrderResolvers: resolvers,
}
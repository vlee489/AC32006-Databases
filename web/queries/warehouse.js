import { gql } from '@apollo/client';

// Get details on a warehouse
export const GET_WAREHOUSE = gql`
  query {
    getWarehouse {
        WarehouseID
        Address1
        Address2
        City
        Region
        Country
        Postcode
    }
  } 
`;

// Get the Products housed in a warehouse
export const GET_WAREHOUSE_PRODUCTS = (warehouseId, productId) => gql`
    query {
        getWarehouseProducts(WarehouseID: ${warehouseId}, ProductID: ${productId}) {
            WarehouseProductID
  	        Product {
                ProductID
                Name
                Category
                Price
                Description
                Weight
                Colour
                Dimensions
                ImageURL
            }
  	        Qty
  	        Location
  	        Warehouse {
                WarehouseID
                Name
                Address1
                Address2
                City
                Region
                Country
                Postcode
                PhoneNumber
                Email
            }
        }
    }
`;

// Get the warehouses with a product
export const GET_WAREHOUSE_WITH_PRODUCT = productId => gql`
    query {
        getWarehouseWithProduct(ProductID: ${productId}) {
            WarehouseProductID
  	        Product {
                ProductID
                Name
                Category
                Price
                Description
                Weight
                Colour
                Dimensions
                ImageURL
            }
  	        Qty
  	        Location
  	        Warehouse {
                WarehouseID
                Name
                Address1
                Address2
                City
                Region
                Country
                Postcode
                PhoneNumber
                Email
            }
        }
    }
`;
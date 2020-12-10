import { gql } from '@apollo/client';

export const GET_INVENTORY = (branchId, productId) => gql`
  query {
    getInventory(BranchID: ${branchId}, ProductID: ${productId}) {
        InventoryID
        QTY
        Branch {
            BranchID
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
    }
  } 
`;
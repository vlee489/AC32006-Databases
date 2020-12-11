import { gql } from '@apollo/client';

export const UPDATE_INVENTORY = gql`
  mutation UpdateInventory ($BranchID: ID!, $ProductID: ID!, $Qty: Int!){
    updateInventory (BranchID: $BranchID, ProductID: $ProductID, Qty: $Qty){
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

export default UPDATE_INVENTORY;
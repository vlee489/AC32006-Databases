import { gql } from '@apollo/client';

export const GET_INVENTORY = (branchId) => gql`
  query {
    getInventory(BranchID: ${branchId}) {
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

export const GET_BRANCHES_IN_STOCK = gql`
  query GetBranchesInStock($productOrders: [ProductOrder]!) {
    getBranchesInStock(Products: $productOrders) {
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
  }
`;
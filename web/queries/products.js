import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query {
    getProducts {
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
`;

export const GET_PRODUCTS_BY_CATEGORY = category => gql`
  query {
    getProducts(category: ${category}) {
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
`;

export default GET_PRODUCTS;
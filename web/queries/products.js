import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
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
    }
  }
`;

export default GET_PRODUCTS;
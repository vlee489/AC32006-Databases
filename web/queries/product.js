import { gql } from '@apollo/client';

const GET_PRODUCT = productId => gql`
  query {
    getProducts(ProductID: ${productId}) {
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

export default GET_PRODUCT;
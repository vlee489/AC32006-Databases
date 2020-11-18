import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query {
    getProduct {
      ProductID
      Name
      Catergory
      Price
      Description
      Weight
      Colour
      Dimensions
    }
  }
`;

export const GET_PRODUCT = gpl`
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

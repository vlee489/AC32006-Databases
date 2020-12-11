import { gql } from '@apollo/client';

export const GET_STAFF = gql`
  query {
    getStaff {
      StaffID
      Address
      Email
      FirstName
      LastName
      NINumber
    }
  } 
`;
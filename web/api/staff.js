export const GET_STAFF = gpl`
  query {
    getStaff {
      StaffID
      Address
      Email
      Firstname
      Lastname
      NINumber
    }
  } 
`;
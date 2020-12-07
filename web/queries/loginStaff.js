import { gql } from "@apollo/client";

export const loginStaff = () => gql`
    query {
        loginStaff {
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
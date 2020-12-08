import { gql } from "@apollo/client";

export const loginStaff = () => gql`
    query {
        getLoginStaff {
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
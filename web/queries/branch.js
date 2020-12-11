import { gql } from "@apollo/client";

export const GET_BRANCHES = gql`
    query {
        getBranches {
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
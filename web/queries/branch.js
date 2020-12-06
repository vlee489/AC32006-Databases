import { gql } from "@apollo/client";

export const getBranches = () => gql`
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
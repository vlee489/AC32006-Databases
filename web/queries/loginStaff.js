import { gql } from "@apollo/client";

export const LOGIN_STAFF = gql`
    query{
        loginStaff{
            StaffID
            FirstName
            LastName
            PhoneNumber
            NINumber
            Address
            Wage
            Position
            Email
        }
    }
`;


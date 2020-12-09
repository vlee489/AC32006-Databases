import { gql } from '@apollo/client';

export const ADD_STAFF = gql`
    mutation AddStaff($firstName: String!, $lastName: String!, $phoneNumber: String!, $niNumber: String!, $address: String!, $wage: Float!, $position: Int!, $email: String!, $password: String!) {
        addStaff(FirstName: $firstName, LastName: $lastName, PhoneNumber: $phoneNumber, NINumber: $niNumber, Address: $address, Wage: $wage, Position: $position, Email: $email, Password: $password) {
            FirstName
            LastName
        }
    }
`;

export const ASSIGN_STAFF_TO_BRANCH = (branchId, staffId) => gql`
    mutation {
        assignStaffToBranch(BranchID: ${branchId}, StaffID: ${staffId}) {
            Staff: {
                StaffID
                FirstName
                LastName
            }
            Branch: {
                BranchID
                Name
            }
        }
    }
`;

export const REMOVE_STAFF_FROM_BRANCH = (branchId, staffId) => gql`
    mutation {
        removeStaffFromBranch(BranchID: ${branchId}, StaffID: ${staffId}) {
            Staff: {
                StaffID
                FirstName
                LastName
            }
        }
    }
`;
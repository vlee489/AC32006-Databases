import { gql } from '@apollo/client';

export const ADD_STAFF = details => {
    const { firstName, lastName, phoneNumber, niNumber, address, wage, position, email, password } = details;
    return gql`
        mutation{
            addStaff(FirstName: ${firstName}, LastName: ${lastName}, PhoneNumber: ${phoneNumber}, NINumber: ${niNumber}, Address: ${address}, Wage: ${wage}, Position: ${position}, Email: ${email}, Password: ${password}) {
                StaffID
            }
        }
    `
};

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
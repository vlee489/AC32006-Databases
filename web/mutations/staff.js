import { gql } from '@apollo/client';

export const ADD_STAFF = gql`
    mutation AddStaff(
        $firstName: FirstName_String_NotNull_minLength_1_maxLength_45!,
        $lastName: LastName_String_NotNull_minLength_1_maxLength_45!,
        $phoneNumber: PhoneNumber_String_NotNull_maxLength_12!,
        $niNumber: NINumber_String_NotNull_minLength_9_maxLength_9!,
        $address: String!,
        $wage: Float!,
        $position: Position_Int_NotNull_min_1_max_3!,
        $email: Email_String_NotNull_minLength_5_maxLength_45_format_email!,
        $password: String!
        )
        {
        addStaff(Staff:{FirstName: $firstName, LastName: $lastName, PhoneNumber: $phoneNumber, NINumber: $niNumber, Address: $address, Wage: $wage, Position: $position, Email: $email, Password: $password}) {
            FirstName
            LastName
        }
    }
`;

export const ASSIGN_STAFF_TO_BRANCH = gql`
    mutation AssignStaffToBranch($branchId: ID!, $staffId: ID!) {
        assignStaffToBranch(BranchID: $branchId, StaffID: $staffId) {
                Staff {
                    StaffID
                    FirstName
                    LastName
                }
                Branch {
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
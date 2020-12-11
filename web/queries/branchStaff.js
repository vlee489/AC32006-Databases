import { gql } from '@apollo/client';

export const GET_BRANCH_STAFF = branchId => gql`
    query {
        getBranchStaff(BranchID: ${branchId}) {
            StaffID
        }
    }
`;
import { gql } from '@apollo/client';

export const CREATE_SHIFT = gql`
    mutation CreateShift ($Start: String!, $End: String!, $BranchID: ID!, $StaffReq: Int!) {
        createShift(Start: $Start, End: $End, BranchID: $BranchID, StaffReq: $StaffReq) {
            ShiftID
            Start
            End
            StaffReq
            Branch {
                BranchID
                Name
                Address2
                City
                Region
                Country
                Postcode
                PhoneNumber
                Email
            }
        }
    }
`;

export default CREATE_SHIFT;

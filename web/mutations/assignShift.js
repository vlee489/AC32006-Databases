import { gql } from '@apollo/client';

export const ASSIGN_SHIFT = gql`
    mutation AssignShift ($ShiftID: ID!, $StaffID: ID){
        assignShift(ShiftID: $ShiftID, StaffID: $StaffID) {
            ShiftID
            Start
            End
            StaffReq
            Branch{
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
            Staff {
                StaffID
            }
        }
    }
`;

export default ASSIGN_SHIFT;

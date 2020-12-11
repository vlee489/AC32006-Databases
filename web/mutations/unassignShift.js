import { gql } from '@apollo/client';

export const UNASSIGN_SHIFT = gql`
    mutation UnassignShift ($ShiftID: ID!, $StaffID: ID){
        unassignShift(ShiftID: $ShiftID, StaffID: $StaffID) {
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

export default UNASSIGN_SHIFT;

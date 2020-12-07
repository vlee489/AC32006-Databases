import { gql } from '@apollo/client';

export const ASSIGN_SHIFT = (shiftID, staffID) => gql`
    mutation{
        assignShift(ShiftID: ${shiftID}, StaffID: ${staffID}){
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
        }
    }
`;

export default ASSIGN_SHIFT;

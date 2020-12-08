import { gql } from '@apollo/client';

export const GET_SHIFTS = (branchId) => gql`
    query{
        getShifts(BranchID: ${branchId}) {
            ShiftID
            Start
            End
            StaffReq
            Branch {
                BranchID
            }
        }
    }
`;

export const GET_STAFF_ON_SHIFT = (shiftID) => gql`
    query{
        staffOnShift(ShiftID: ${shiftID}){
            StaffID
        }
    }`



// query{
//     shiftOfStaff {
//         ShiftID
//         Start
//         End
//         Branch
//     }
// }

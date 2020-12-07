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

export default GET_SHIFTS;

// query{
//     shiftOfStaff {
//         ShiftID
//         Start
//         End
//         Branch
//     }
// }

// query{
//     staffOnShift{
//         StaffID
//     }
// }

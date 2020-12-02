import { gql } from '@apollo/client';

export const GET_SHIFTS = userToken => gql`
    query{
        getShifts {
            ShiftID
            Start
            End
            Branch
        }
    }
`;

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

import { gql } from '@apollo/client';

export const GET_SHIFT = gql`
    query{
        getShifts {
            ShiftID
            Start
            End
            Branch
        }
    }
`;

export const SHIFT_OF_STAFF = gql`
    query{
        shiftOfStaff {
            ShiftID
            Start
            End
            Branch
        }
    }
`;

export const STAFF_ON_SHIFT = gql`
    query{
        staffOnShift{
            StaffID
        }
    }
`;
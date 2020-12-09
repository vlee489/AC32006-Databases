import { gql } from '@apollo/client';

export const GET_PURCHASES = branchId => gql`
    query {
        getBranchPurchases(BranchID: ${branchId}) {
            PurchaseID
            CustomerFirstName
            CustomerLastName
            BillingAddress
            DeliveryAddress
            Paid
            TotalPrice
            Dispatched
            Products{
                Product{
                    Name
                }
                Qty
            }
        }
    }
`;
import { gql } from '@apollo/client';

export const CREATE_PURCHASE = gql`
    mutation CreatePurchase(
        $branch: ID!
        $customerFirstName: String!,
        $customerLastName: String!,
        $billingAddress: String!,
        $deliveryAddress: String!,
        $products:[ProductOrder]!
        )
        {
        createPurchase(
            Details:{
                Branch: $branch,
                CustomerFirstName: $customerFirstName,
                CustomerLastName: $customerLastName,
                BillingAddress: $billingAddress,
                DeliveryAddress: $deliveryAddress,
                Products: $products
            }
        ){
            PurchaseID
            CustomerFirstName
            CustomerLastName
            BillingAddress
            DeliveryAddress
            Paid
            TotalPrice
            Dispatched
            Branch{
                BranchID
                Name
                Address1
                Address2
                City
                Region
                Country
                Postcode
                PhoneNumber
                Email
            }
            Products{
                Qty
                Product{
                    ProductID
                    Name
                    Category
                    Price
                    Description
                    Weight
                    Colour
                    Dimensions
                    ImageURL
                }
            }
        }
    }
`;

export const DISPATCH_PURCHASE = gql`
    mutation DispatchPurchase( $PurchaseID: ID!,$Dispatched: Boolean!){
        dispatchPurchase(PurchaseID: $PurchaseID, Dispatched: $Dispatched) {
            PurchaseID
            Dispatched
        }
    }
`;
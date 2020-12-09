import { gql } from '@apollo/client';

export const ADD_STAFF = gql`
    mutation CreatePurchase(
        $branch: ID!
        $customerFirstName: FirstName_String_NotNull_minLength_1_maxLength_45!,
        $customerLastName: LastName_String_NotNull_minLength_1_maxLength_45!,
        $phoneNumber: PhoneNumber_String_NotNull_maxLength_12!,
        $billingAddress: String!,
        $deliveryAddress: String!,
        $products:[{
            $ProductID: ID!,
            $Qty: Int!
        }]
        )
        {
        createPurchase(
            Details:{
                Branch: $branch,
                CustomerFirstName: $customerFirstName,
                CustomerLastName: $customerLastName,
                BillingAddress: $billingAddres,
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
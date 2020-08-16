import { gql } from 'apollo-boost';

const getRunwayModelsQuery = gql`
    {
        runwayModels{
            firstName
            lastName
            id
        }
    }
`

const getLooksQuery = gql`
    {
        looks{
            description
            id
        }
    }
`

const addLookMutation = gql`
    mutation($description: String!, $designerCollection: String!, $orderInShow: Int!, $assignedRunwayModelId: ID!) {
        addLook(description: $description, designerCollection: $designerCollection, orderInShow: $orderInShow, assignedRunwayModelId: $assignedRunwayModelId){
            description
            id
        }
    }`

const getLookQuery = gql`
    query($id: ID) {
        look(id: $id) {
            id
            description
            designerCollection
            assignedRunwayModel {
                firstName
                lastName
                looks {
                    description
                    designerCollection
                    id
                }
            }
        }
    }
`


export { getLooksQuery, getRunwayModelsQuery, addLookMutation, getLookQuery };
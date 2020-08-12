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

export { getLooksQuery, getRunwayModelsQuery, addLookMutation };
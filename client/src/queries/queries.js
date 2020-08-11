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

export { getLooksQuery, getRunwayModelsQuery};
const graphql = require('graphql');

const { GraphQLObjectType, 
    GraphQLString,
    GraphQLBoolean } = graphql;

const ModelType = new GraphQLObjectType({
    name: 'Model',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        checkedIn: { type: GraphQLBoolean },
    })
});

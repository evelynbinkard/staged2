const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, 
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql;

// dummy data
const models = [
    { id: '1', firstName: 'Evelyn', lastName: 'Binkard', email: 'abcd@gmail.com', checkedIn: false },
    { id: '2', firstName: 'Eve', lastName: 'Bin', email: 'efgh@gmail.com', checkedIn: false },
    { id: '3', firstName: 'Lyn', lastName: 'Kard', email: 'wxyz@gmail.com', checkedIn: false },
];

const looks = [
    { id: '1', collection: 'cocktail', orderInShow: 1, assignedModelId: '3' },
    { id: '2', collection: 'bridal', orderInShow: 1, assignedModelId: '2' },
    { id: '3', collection: 'casual', orderInShow: 1, assignedModelId: '1' },
    { id: '4', collection: 'swim', orderInShow: 2, assignedModelId: '1' },
    { id: '5', collection: 'cocktail', orderInShow: 2, assignedModelId: '2' },
    { id: '6', collection: 'bridal', orderInShow: 2, assignedModelId: '1' },
    { id: '7', collection: 'casual', orderInShow: 2, assignedModelId: '3' }

]

const ModelType = new GraphQLObjectType({
    name: 'Model',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        checkedIn: { type: GraphQLBoolean },
        looks: {
            type: new GraphQLList(LookType),
            resolve(parent, args)  {
                return _.filter(looks, { assignedModelId: parent.id})
            }
        }
    })
});

const LookType = new GraphQLObjectType({
    name: 'Look',
    fields: () => ({
        id: { type: GraphQLID },
        collection: { type: GraphQLString },
        orderInShow: { type: GraphQLInt },
        assignedModel: {
            type: ModelType, 
            resolve(parent, args) {
                console.log(parent)
                return _.find(models, {id: parent.assignedModelId });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        model: { 
            type: ModelType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(models, { id: args.id });
            }
        },
        look: {
            type: LookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(looks, { id: args.id })
            }
        },
        looks: {
            type: new GraphQLList(LookType),
            resolve(parent, args) {
                return looks;
            }
        },
        models: {
            type: new GraphQLList(ModelType),
            resolve(parent, args) {
                return models;
            }
        }

    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})
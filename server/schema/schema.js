const graphql = require('graphql');
const _ = require('lodash');
const Look = require('../models/Look');
const RunwayModel = require('../models/Model');

const { GraphQLObjectType, 
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const RunwayModelType = new GraphQLObjectType({
    name: 'RunwayModel',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        checkedIn: { type: GraphQLBoolean },
        looks: {
            type: new GraphQLList(LookType),
            resolve(parent, args)  {
                return Look.find({assignedRunwayModelId: parent.id });
            }
        }
    })
});

const LookType = new GraphQLObjectType({
    name: 'Look',
    fields: () => ({
        id: { type: GraphQLID },
        designerCollection: { type: GraphQLString },
        description: { type: GraphQLString },
        orderInShow: { type: GraphQLInt },
        assignedRunwayModel: {
            type: RunwayModelType, 
            resolve(parent, args) {
                return RunwayModel.findById(parent.assignedRunwayModelId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        runwayModel: { 
            type: RunwayModelType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return RunwayModel.findById(args.id);
            }
        },
        look: {
            type: LookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Look.findById(args.id);
            }
        },
        looks: {
            type: new GraphQLList(LookType),
            resolve(parent, args) {
                return Look.find({});
            }
        },
        runwayModels: {
            type: new GraphQLList(RunwayModelType),
            resolve(parent, args) {
                return RunwayModel.find({});
            }
        }

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addRunwayModel: {
            type: RunwayModelType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                checkedIn: { type: GraphQLBoolean }
            },
            resolve(parent, args) {
                let runwayModel = new RunwayModel({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    checkedIn: false
                });
                return runwayModel.save();
            }
        },
        addLook: {
            type: LookType,
            args: {
                designerCollection: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                orderInShow: { type: GraphQLInt },
                assignedRunwayModelId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let look = new Look({
                    designerCollection: args.designerCollection,
                    description: args.description,
                    orderInShow: args.orderInShow,
                    assignedRunwayModelId: args.assignedRunwayModelId
                });
                return look.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://evelynbinkard:Aid3n0904@cluster1-1eybm.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('connected to db');
})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000, () => console.log('now listening on port 4000'))
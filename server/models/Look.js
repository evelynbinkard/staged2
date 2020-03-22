const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lookSchema = new Schema({ 
    designerCollection: String,
    description: String,
    orderInShow: Number, 
    assignedRunwayModelId: String
});

module.exports = mongoose.model('Look', lookSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({ 
    firstName: String,
    lastName: String,
    email: String,
    checkedIn: Boolean
});

module.exports = mongoose.model('Model', modelSchema)
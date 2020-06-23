const {Schema,model,Types} = require('mongoose');

const schema = new Schema({
    name:{type: String},
    tasks:[{type: Number},]
}) 
module.exports = model('TaskList',schema);
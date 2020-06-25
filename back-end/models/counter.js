const {Schema,model} = require('mongoose');
const schema = new Schema({
    
    
    id:{type: Number}
})
module.exports = model('counters',schema)
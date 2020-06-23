const {Schema,model,Types} = require('mongoose');
const schema = new Schema({
    authorModel:{type:Object},
    commentedId: {type:Number},
    text:{type:String},
    answears:[{type:Object}],
    id:{type: Number}
})

module.exports = model('Comment',schema)     
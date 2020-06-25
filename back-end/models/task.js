const {Schema,model,Types} = require('mongoose');

const schema = new Schema({
    authorModel:{type:Object},
    projectModel:{type:Object},
    id:{type:Number},
    name:{type:String},
    defenition:{type:String},
    perfomers:[{type: Object}],
    comments:[{type:Object}],
    invited:[{type:Object}],
    deleted: {type:Boolean},
})
module.exports = model('Task',schema)     
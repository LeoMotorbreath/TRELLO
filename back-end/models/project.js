const {Schema,model,Types} = require('mongoose');


const schema = new Schema({
    name:{type: String,required: true},
    id:{type: Number},
    creator:{type: Types.ObjectId},
    defenition:{type:String},
    taskLists:[{type: Object}],
    invited:[{type:Object}],
    perfomers:[{type: Object}],
    deleted: {type:Boolean}
})

module.exports = model('Project',schema)    
const {Schema,model,Types} = require('mongoose');
const schema = new Schema({
    inviterModel:{type:Object},
    invitedToModel: {type:Object},
    invitedId:{type:Number},
    text:{type:String},
    id:{type: Number}
})

module.exports = model('Invite',schema)     
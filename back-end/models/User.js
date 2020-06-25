const {Schema,model,Types} = require('mongoose');
const schema = new Schema({
    email:    {type: String, required: true},
    id:       {type: Number},
    password: {type: String, required: true},
    projects: [{type: Number}],
    invites:  [{type: Object}],
    tasks:    [{type: Number}]
    
})

module.exports = model('User',schema)    
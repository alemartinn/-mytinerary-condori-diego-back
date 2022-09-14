const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
        type: String,
        required: true,
        min: [2, 'Required 2 characters'],
        lowercase: true
    },
    password: {
        type: Array, required: true},
        photo: {type: String, required: true,
            validate: function (value){
                if (!value.startsWith('http')) {
                    throw new Error('Must start with http')
                }
            }},
    country: {type: String, required: true, min: 4, max:30},
    from: [{type: String, required: true,  min: 4, max:59}],
    loggedIn: {type:Boolean, required: true},
    verified: {type:Boolean, required: true},
    code: {type:String, required:true}
});

const User = mongoose.model('users',schema);

module.exports = User;
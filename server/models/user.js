const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { 
        type: String,
        required: true, 
        trim: true,
    },

    username: { 
        type: String,
        required: true,
        trim: true,
        unique: true 
    },

    email: { 
        type: String,
        required: true, 
        unique: true, 
        trim: true
    },

    password: { 
        type: String, 
        required: true, 
    }
})


module.exports = mongoose.model('User', UserSchema); 
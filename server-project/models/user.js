const mongoose = require("mongoose"); 

const userModel = mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    }, 
    lastname: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    active_status: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "user",
    },
    avatar: {
        type: String,
    },
}); 

const User = mongoose.model("UserCollection", userModel); 

module.exports = User; 

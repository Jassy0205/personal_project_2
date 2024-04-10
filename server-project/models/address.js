const mongoose = require("mongoose"); 

const addressSchema = mongoose.Schema({
    name_country: {
        type: String, 
        required: true,
    }, 
    department: {
        type: String, 
        required: true,
    },
    municipality: {
        type: String, 
        required: true,
    },
    nomenclature: {
        type: String, 
        required: true,
    },
    address_active: {
        type: Boolean, 
        required: true,
    }
});

module.exports = mongoose.model("Address", addressSchema); 
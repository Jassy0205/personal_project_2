const mongoose = require("mongoose"); 

const superheroSchema = mongoose.Schema({
    superhero_name: {
        type: String, 
        required: true,
    }, 
    superpowers: {
        type: Array, 
        required: true,
    },
    isAlive: {
        type: Boolean, 
        required: true,
    },
});

module.exports = mongoose.model("Superheroe", superheroSchema); 
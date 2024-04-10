const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); 

//Import routes
const addressRoutes = require("./routes/address_routes");
const userRoutes = require("./routes/user_routes");
const superheroRoutes = require("./routes/superhero_routes"); 

const app = express(); 
const PORT = process.env.PORT || 3001; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Middelware
app.use(cors());

// http://localhost:3001/
app.listen(PORT, () => console.log("Server is running in port", PORT));

// Creación de las rutas 
app.use("/api/v1/users", userRoutes);  // http://localhost:3001/api/v1/users/new-user
app.use("/api/v1/superheroes", superheroRoutes);  // http://localhost:3001/api/v1/superheroes/new-superhero
app.use("/api/v1/address", addressRoutes);

//Connect to MongoDB
const getConnection = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION);
      if (conn) {
        console.log(`MongoDB Connected on ${conn.connection.host}`);
      } else {
        console.log("Failed to connect DB");
      }
    } catch (error) {
      console.log(`Failed with error: ${error.message}`);
    }
};

getConnection();
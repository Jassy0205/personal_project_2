const AddressModel = require("../models/address");

const createAddress = async (req, res) => {
    try{
        const { name_country, department, municipality, nomenclature, address_active} = req.body; 
        const newAddress = new AddressModel({
            name_country, 
            department, 
            municipality,
            nomenclature, 
            address_active,
        });
        //Enviamos el superheroe a la base de datos
        const addressSaved = await newAddress.save(); 
        res.status(201).json(addressSaved); 
    }catch (error)
    {
        res.status(500).json({message: error.message});
    }
}; 

module.exports = {createAddress}; 
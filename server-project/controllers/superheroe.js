const SuperheroModel = require("../models/superheroe");

const createSuperhero = async (req, res) => {
    try{
        const { superhero_name, superpowers, isAlive} = req.body; 
        const newSuperhero = new SuperheroModel({
            superhero_name,
            superpowers,
            isAlive,
        });
        //Enviamos el superheroe a la base de datos
        const superheroSaved = await newSuperhero.save(); 
        res.status(201).json(superheroSaved); 
    }catch (error)
    {
        res.status(500).json({message: error.message});
    }
}; 

// Controlador para obtener todos los superhéroes
const getAllSuperheroes = async (req, res) => {
    try {
        const superheroes = await SuperheroModel.find();
        res.status(200).json({ superheroes });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Falló al obtener los superheroes", error });
    }
};

// Controlador para obtener un superhéroe por su ID
const getSuperheroById = async (req, res) => {
    try {
        const superhero = await SuperheroModel.findById(req.params.id);
        if (!superhero) {
        return res.status(404).json({ message: "Superheroe no encontrado" });
        }
        res.status(200).json({ superhero });
    } catch (error) {
        res.status(500).json({ message: "Fallo al buscar el superheroe", error });
    }
};

// Controlador para actualizar un superhéroe por su ID
const updateSuperhero = async (req, res) => {
    try {
        const { name, superpowers, isAlive } = req.body;
        const updatedSuperhero = await SuperheroModel.findByIdAndUpdate(
            req.params.id,
            { name, superpowers, isAlive },
            { new: true }
        );
        if (!updatedSuperhero) {
            return res.status(404).json({ message: "Superhero not found" });
        }
        res
        .status(200)
        .json({ message: "Superhero updated successfully", updatedSuperhero });
    } catch (error) {
        res.status(500).json({ message: "Failed to update superhero", error });
    }
};

// Controlador para eliminar un superhéroe por su ID
const deleteSuperhero = async (req, res) => {
    try {
        const superhero = await SuperheroModel.findByIdAndDelete(req.params.id);
        if (!superhero) {
            return res.status(404).json({ message: "Superhero not found" });
        }
        res.status(200).json({ message: "Superhero deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete superhero", error });
    }
};

module.exports = {
    createSuperhero,
    getAllSuperheroes,
    getSuperheroById,
    updateSuperhero,
    deleteSuperhero,
};
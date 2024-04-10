const express = require("express");
const router = express.Router();
const superheroController = require("../controllers/superheroe");

// Ruta para obtener todos los usuarios
router.get("/", superheroController.getAllSuperheroes);

// Ruta para obtener un usuario por su ID
router.get("/:id", superheroController.getSuperheroById);

// Ruta para crear un nuevo usuario
router.post("/new-superhero", superheroController.createSuperhero);

// Ruta para actualizar un usuario existente
router.patch("/:id", superheroController.updateSuperhero);

// Ruta para eliminar un usuario
router.delete("/:id", superheroController.deleteSuperhero);

module.exports = router;
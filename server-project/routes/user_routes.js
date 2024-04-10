const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/user");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/users");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });

//Request para crear: recibe la URI que conforma el end point y el metodo del controlador 
router.post("/new-user", upload.single("avatar"), userController.createUser); 

// Ruta para obtener todos los usuarios
router.get("/", userController.getUsers);

// Ruta para obtener un usuario por su ID
router.get("/:id", userController.getUserById);

// Ruta para actualizar un usuario existente
router.patch("/:id", userController.updateUser);

// Ruta para eliminar un usuario
router.delete("/:id", userController.deleteUser);

module.exports = router;

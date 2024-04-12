const UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try{
      const { user_name, lastname, email, active_status, role, password } = req.body; 
      const avatar = req.file ? req.file.filename : null;
      console.log(avatar);  
      
      const user = new UserModel({ 
        user_name, 
        lastname, 
        email, 
        active_status,
        role,
        password,
        avatar
      });

      const newUser = await user.save();
      res.status(201).json(newUser); 
  }catch (error)
  {
    res.status(400).json({ message: errorMessage });
  }
}; 

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.find(req.params.email);

    if (!user || password != user[0].password) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Generar un token de acceso
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    req.headers.authorization = null;
    res.status(200).json({ message: 'Logout exitoso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
  
// Método para obtener un usuario por su ID
const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
// Método para actualizar un usuario por su ID
const updateUser = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, lastname, email, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
// Método para eliminar un usuario por su ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login,
};

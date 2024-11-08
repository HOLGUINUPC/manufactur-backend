// src/routes/userRoutes.ts
import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';

const router = express.Router();

// Ruta para registrar un nuevo usuario (pública)
router.post('/register', registerUser);

// Ruta para iniciar sesión (pública)
router.post('/login', loginUser);

// Ruta para obtener el perfil de usuario (pública en este caso, usando userId en la query)
router.get('/profile', getUserProfile);

export default router;

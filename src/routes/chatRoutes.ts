import express from 'express';
import { createConversation, getUserConversations } from '../controllers/conversationController';
import { sendMessage, getMessagesByConversation } from '../controllers/messageControler';

const router = express.Router();

// Rutas para conversaciones
router.post('/conversations', createConversation); // Crear una nueva conversación
router.get('/conversations/:userId', getUserConversations); // Obtener todas las conversaciones de un usuario

// Rutas para mensajes
router.post('/messages', sendMessage); // Enviar un mensaje en una conversación
router.get('/messages/:conversationId', getMessagesByConversation); // Obtener todos los mensajes de una conversación

export default router;

import { Request, Response } from 'express';
import Message from '../models/Message';
import Conversation from '../models/Conversation';

// Enviar un mensaje
export const sendMessage = async (req: Request, res: Response) => {
    const { conversationId, sender, content } = req.body;

    try {
        const newMessage = new Message({
            conversation: conversationId,
            sender,
            content,
        });
        
        await newMessage.save();

        // Agregar el mensaje a la conversación correspondiente
        await Conversation.findByIdAndUpdate(conversationId, {
            $push: { messages: newMessage._id },
        });

        res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Error sending message' });
    }
};

// Obtener mensajes por conversación
export const getMessagesByConversation = async (req: Request, res: Response) => {
    const { conversationId } = req.params;

    try {
        const messages = await Message.find({ conversation: conversationId }).sort({ createdAt: 1 });
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Error fetching messages' });
    }
};

import { Request, Response } from 'express';
import Conversation from '../models/Conversation';

export const createConversation = async (req: Request, res: Response): Promise<void> => {
    const { participants } = req.body;

    if (participants.length !== 2) {
        res.status(400).json({ success: false, message: 'La conversación debe ser entre dos usuarios.' });
        return;
    }

    try {
        let conversation = await Conversation.findOne({ participants: { $all: participants } });

        if (!conversation) {
            conversation = new Conversation({ participants });
            await conversation.save();
        }

        res.status(201).json({ success: true, data: conversation });
    } catch (error) {
        console.error('Error creating conversation:', error);
        res.status(500).json({ success: false, message: 'Error creating conversation' });
    }
};


// Obtener todas las conversaciones de un usuario
export const getUserConversations = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const conversations = await Conversation.find({ participants: userId })
            .populate('participants', 'username') // Solo traemos el `username`
            .populate({
                path: 'messages',
                options: { sort: { createdAt: -1 }, limit: 1 }, // Último mensaje
            });

        res.status(200).json({ success: true, data: conversations });
    } catch (error) {
        console.error('Error fetching user conversations:', error);
        res.status(500).json({ success: false, message: 'Error fetching conversations' });
    }
};

import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';
import { IMessage } from './Message'; // Importar la interfaz IMessage desde Message.ts

export interface IConversation extends Document {
  participants: IUser['_id'][]; // Los IDs de los usuarios participantes
  messages: IMessage['_id'][]; // Lista de mensajes asociados
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
);

export default mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', conversationSchema);

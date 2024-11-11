// src/index.ts
import express from 'express';
import dbConnect from './config/dbConnect';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import imageRoutes from './routes/imageRoutes';

import dotenv from 'dotenv';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

dbConnect();

app.use(cors({
    origin: 'http://localhost:3000', // URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rutas para los diferentes recursos de la API
app.use('/api/users', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', imageRoutes);  // Añadimos la ruta de imágenes
app.use('/api/chat', chatRoutes); // Añade las rutas de chat aquí


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

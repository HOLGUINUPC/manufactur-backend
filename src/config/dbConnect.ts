import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar dotenv aquí también

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('Por favor define la variable MONGO_URI en el archivo .env');
}

async function dbConnect() {
  try {
    await mongoose.connect(MONGO_URI); 
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
}

export default dbConnect;

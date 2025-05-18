import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || '';

    await mongoose.connect(mongoUri, {
      // Estas opciones ya no son necesarias con las versiones recientes de Mongoose
    });

    console.log('🟢 Conexión a MongoDB establecida');
  } catch (error) {
    console.error('🔴 Error al conectar a MongoDB:', error);
    process.exit(1); // Finaliza la app si no se puede conectar
  }
};

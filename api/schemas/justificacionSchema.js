import mongoose from 'mongoose';

const justificacionSchema = new mongoose.Schema({
  usuario: String,
  curso: String,
  asunto: { type: String, required: true },
  descripcion: { type: String, required: true },
  archivo: { 
    nombre: String,
    datos: Buffer,
    contentType: String
  },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' }
});

export default mongoose.model('Justificacion', justificacionSchema);
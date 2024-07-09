import mongoose from 'mongoose';


const profesorSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    especialidad: String,
    disponibilidad: String,
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' }
});

mongoose.model("profesor", profesorSchema);

export default mongoose.model("profesor", profesorSchema);


import mongoose from 'mongoose';


const profesorSchema = new mongoose.Schema({
    nombre: String,
    especialidad: String,
    rut: String,
    // password: String,
    disponibilidad: String,
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' }
});

mongoose.model("profesor", profesorSchema);

export default mongoose.model("profesor", profesorSchema);


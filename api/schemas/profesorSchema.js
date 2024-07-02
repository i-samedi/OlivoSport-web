import mongoose from 'mongoose';

const profesorSchema = new mongoose.Schema({
    nombre: String,
    especialidad: String,
    cursos: String,
    horarios: String,
    disponibilidad: String
});

mongoose.model("profesor", profesorSchema);

export default mongoose.model("profesor", profesorSchema);


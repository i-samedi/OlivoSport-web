import mongoose from 'mongoose';

const cursosSchema = new mongoose.Schema({
    curso: String,
    horario: String,
    profesor: { type: mongoose.Schema.Types.ObjectId, ref: 'profesor' },
    sector: String,
    disponibilidad: String
});

mongoose.model("cursos", cursosSchema);

export default mongoose.model("cursos", cursosSchema);


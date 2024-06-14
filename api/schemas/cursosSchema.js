import mongoose from 'mongoose';

const cursosSchema = new mongoose.Schema({

});

mongoose.model("cursos", cursosSchema);

export default mongoose.model("cursos", cursosSchema);


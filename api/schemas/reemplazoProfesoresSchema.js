import mongoose from 'mongoose';

const reemplazoProfesoresSchema = new mongoose.Schema({

});

mongoose.model("reemplazos_profesores", reemplazoProfesoresSchema);

export default mongoose.model("usuarios", reemplazoProfesoresSchema);


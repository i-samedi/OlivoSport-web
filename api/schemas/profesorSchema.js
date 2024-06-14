import mongoose from 'mongoose';

const profesorSchema = new mongoose.Schema({

});

mongoose.model("profesor", profesorSchema);

export default mongoose.model("profesor", profesorSchema);


import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const LoginSchema = new mongoose.Schema({
    rut: { 
        type: String, 
        required: true 
    },
    password: {
        type: String, 
        required: true 
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    tipo_de_usuario: {
        type: String,
        required: true
    }
});

LoginSchema.method('setPassword', async function(password){
    const hash = await bcrypt.hash(password, 10);
    this.password = hash;
});

LoginSchema.method('validPassword', async function(unhashed){
    return await bcrypt.compare(unhashed, this.password);
});

mongoose.model("usuarios", LoginSchema);

export default mongoose.model("usuarios", LoginSchema);


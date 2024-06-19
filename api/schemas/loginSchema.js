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





const Login = mongoose.model("usuarios", LoginSchema);

export default Login;


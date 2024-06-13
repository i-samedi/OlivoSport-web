import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://pipemendez:rn0pWgRZJk4FJ9T7@olivossport.exmftev.mongodb.net/OlivosSportDB").then(()=>{
    console.log("MongoDB conectado")
}).catch(()=>{
    console.log("Conexion fallida con MongoDB")
})

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

mongoose.model("usuarios", LoginSchema);

export default mongoose;
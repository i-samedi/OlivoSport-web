import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/OlivosSport").then(()=>{
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
    }
});

mongoose.model("Usuarios", LoginSchema);

export default mongoose;

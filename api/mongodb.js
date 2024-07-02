import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.connect("mongodb+srv://pipemendez:rn0pWgRZJk4FJ9T7@olivossport.exmftev.mongodb.net/OlivosSportDB").then(()=>{
    console.log("MongoDB conectado")
}).catch(()=>{
    console.log("Conexion fallida con MongoDB")
})

export default mongoose;
import { db, sequelize} from './db.js';
import {User} from '../middlewares/userAuth.js';
import bcrypt from 'bcrypt';

async function createUser(rut, password, tipo_de_usuario, nombre, apellido){
    try {
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            rut: rut,
            password: hashedPassword,
            tipo_de_usuario: tipo_de_usuario,
            nombre: nombre,
            apellido: apellido 
        });
        console.log("Nuevo usuario creado: ", newUser.toJSON());

    } catch (error) {
        console.error('Error al crear el usuario', error);
    }
}

export default createUser;

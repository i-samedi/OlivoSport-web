import { db, sequelize } from './db.js';
import { User } from '../middlewares/userAuth.js';
import bcrypt from 'bcrypt';

async function createUser(rut, password, tipo_de_usuario, nombre, apellido) {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { rut: rut } });
        
        if (existingUser) {
            console.log('El usuario ya existe:', existingUser.toJSON());
            return;
        }

        // Si el usuario no existe, crear uno nuevo
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            rut: rut,
            password: hashedPassword,
            tipo_de_usuario: tipo_de_usuario,
            nombre: nombre,
            apellido: apellido
        });
        
        console.log('Usuario creado:', newUser.toJSON());
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
}

export default createUser;

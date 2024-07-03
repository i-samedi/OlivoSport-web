import express from 'express';
import multer from 'multer';
import Profesor from './schemas/profesorSchema.js';
import Cursos from './schemas/cursosSchema.js';
import Justificacion from './schemas/justificacionSchema.js';
import Login from './schemas/loginSchema.js';
import bcrypt from "bcrypt";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function checkAuth(req, res, next) {
    if (req.session && req.session.userId) {
        console.log("sesion iniciada con exito");
        next();
    } else {
        console.log("Sesion no iniciada");
        res.redirect("/");
    }
}

router.get('/', (req, res) => {
    res.render("index");
});

router.get('/logout', checkAuth, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Sesion cerrada con exito!");
        res.redirect('/');
    });
});

router.get("/menu", checkAuth, (req, res) => {
    const { nombre, apellido, tipo_de_usuario } = res.locals.user;
    res.render("menu", { nombre, apellido, tipo_de_usuario });
});

router.get('/user', checkAuth, async (req, res) => {
    try {
        // Obtener el tipo de usuario
        const tipo_de_usuario = res.locals.user.tipo_de_usuario;

        if (tipo_de_usuario === 'Administrador') {
            // Si es administrador, renderizar solo nombre, apellido y tipo_de_usuario del usuario logueado
            const { nombre, apellido } = res.locals.user;
            return res.render('user', { tipo_de_usuario, nombre, apellido });
        } else {
            // Si es otro tipo de usuario (como Profesor), continuar con el flujo normal
            // Obtener el ID del usuario logueado desde res.locals.user (asumiendo que contiene el ID del profesor)
            const userId = res.locals.user._id;

            // Buscar al profesor basado en el usuario logueado
            const profesor = await Profesor.findOne({ usuario: userId }).populate('usuario');

            if (!profesor) {
                return res.status(404).send('Profesor no encontrado');
            }

            // Obtener cursos asociados al profesor
            const cursos = await Cursos.find({ profesor: profesor._id }).populate('profesor');

            // Obtener otros datos relevantes del profesor
            const { nombre, apellido, especialidad } = profesor; // Nombre, apellido y especialidad del profesor
            const horarios = profesor.disponibilidad; // Obtener horarios del profesor

            // Renderizar la vista user.ejs con los datos del profesor, cursos y horarios
            return res.render('user', { tipo_de_usuario, nombre, apellido, especialidad, cursos, horarios });
        }
    } catch (error) {
        console.error('Error al obtener datos del usuario y cursos:', error);
        res.status(500).send('Error al obtener datos del usuario y cursos');
    }
});

router.get('/justificaciones', checkAuth, async (req, res) => {
    try {
        const profesoresDisponibles = await Profesor.find({
            disponibilidad: { $regex: new RegExp('^si$', 'i') }
        });
        const justificaciones = await Justificacion.find({});
        const { tipo_de_usuario } = res.locals.user;
        res.render('justificaciones', { tipo_de_usuario, profesores: profesoresDisponibles, justificaciones });
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).send(error);
    }
});

router.get("/plantilla", checkAuth, (req, res) => {
    res.render("plantilla", {tipo_de_usuario: 'Administrador'});
});

/* router.get("/profesores", checkAuth, (req, res) => {
    const { nombre, apellido, tipo_de_usuario } = res.locals.user;
    res.render("profesores", { nombre, apellido, tipo_de_usuario });
}); */

//PRUEBA DE FUNCIONAMIENTO DE CRUD DE PROFESORES (CREE UN NUEVO ARCHIVO EJS PA VER COMO FUNCIONAN) (HAy que adaptarlo)

router.get('/profes',checkAuth, async (req, res) => {
    try {
        const profesores = await Profesor.find({}).populate('usuario', 'rut'); // Aquí populamos la referencia al usuario
        const { tipo_de_usuario } = res.locals.user;
        res.render('profes', { tipo_de_usuario, profesores });
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).send(error);
    }
});

router.post('/profes', async (req, res) => {
    try {
        // Crear un nuevo usuario
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashear la contraseña
        const newUser = new Login({
            rut: req.body.rut,
            password: hashedPassword,
            nombre: req.body.nombre, // Cambiar a nombre de usuario si es necesario
            apellido: req.body.apellido,
            tipo_de_usuario: 'profesor' // Asegúrate de que el tipo de usuario sea correcto
        });
        const savedUser = await newUser.save();

        // Crear un nuevo profesor y asociarlo al usuario
        const newProfesor = new Profesor({
            nombre: req.body.nombre,
            especialidad: req.body.especialidad,
            disponibilidad: req.body.disponibilidad,
            usuario: savedUser._id // Asociar el profesor al usuario
        });
        await newProfesor.save();

        res.redirect('/profes');
    } catch (error) {
        console.error('Error al crear el profesor:', error);
        res.status(500).send('Error al crear el profesor');
    }
});

router.post('/profes/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, especialidad, disponibilidad, password } = req.body;

        // Encontrar al profesor por ID
        const profesor = await Profesor.findById(id).populate('usuario');

        profesor.nombre = nombre;
        profesor.especialidad = especialidad;
        profesor.disponibilidad = disponibilidad;


        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            profesor.usuario.password = hashedPassword;
        }

        await profesor.save();
        await profesor.usuario.save();

        res.redirect('/profes');
    } catch (error) {
        console.error('Error al actualizar el profesor y usuario:', error);
        res.status(500).send('Error al actualizar el profesor y usuario');
    }
});

router.post('/profes/delete/:id', async (req, res) => {
    try {
        // Buscar el profesor por ID
        const profesor = await Profesor.findById(req.params.id);
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }

        // Eliminar el usuario asociado al profesor
        await Login.findByIdAndDelete(profesor.usuario);

        // Eliminar el profesor
        await Profesor.findByIdAndDelete(req.params.id);

        res.redirect('/profes');
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
        res.status(500).send('Error al eliminar el profesor');
    }
});

router.get('/cursos', checkAuth, async (req, res) => {
    try {
        const cursos = await Cursos.find({}).populate('profesor');
        const profesores = await Profesor.find({});
        res.render('cursos', { cursos, profesores, tipo_de_usuario: 'Administrador' });
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).send('Error al obtener los cursos');
    }
});

// Ruta para agregar un nuevo curso
router.post('/cursos', async (req, res) => {
    try {
        const { curso, horario, profesor, sector, disponibilidad } = req.body;
        const nuevoCurso = new Cursos({ curso, horario, profesor, sector, disponibilidad });
        await nuevoCurso.save();
        res.redirect('/cursos');
    } catch (error) {
        console.error('Error al crear el curso:', error);
        res.status(500).send('Error al crear el curso');
    }
});

// Ruta para editar un curso
router.post('/cursos/edit/:id', async (req, res) => {
    try {
        await Cursos.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/cursos');
    } catch (error) {
        console.error('Error al actualizar el curso:', error);
        res.status(500).send('Error al actualizar el curso');
    }
});

// Ruta para eliminar un curso
router.post('/cursos/delete/:id', async (req, res) => {
    try {
        await Cursos.findByIdAndDelete(req.params.id);
        res.redirect('/cursos');
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
        res.status(500).send('Error al eliminar el curso');
    }
});

router.post('/crear-justificacion', checkAuth, upload.single('archivo'), async (req, res) => {
    try {
        const nuevaJustificacion = new Justificacion({
        usuario: req.session.userId,
        curso: req.body.curso,
        asunto: req.body.asunto,
        descripcion: req.body.descripcion,
        archivo: req.file ? {
        nombre: req.file.originalname,
        datos: req.file.buffer,
        contentType: req.file.mimetype
        } : undefined
        });

    await nuevaJustificacion.save();
    res.json({ success: true });
    } catch (error) {
        console.error('Error al crear la justificación:', error);
        res.status(500).json({ success: false, message: 'Error al crear la justificación' });
    }
    });

router.get('/descargar-archivo/:justificacionId', async (req, res) => {
    try {
        const justificacionId = req.params.justificacionId;
        const justificacion = await Justificacion.findById(justificacionId);

        if (!justificacion || !justificacion.archivo || !justificacion.archivo.datos) {
        return res.status(404).send('Archivo no encontrado');
        }

    res.set({
        'Content-Type': justificacion.archivo.contentType,
        'Content-Disposition': `attachment; filename="${justificacion.archivo.nombre}"`
    });

    res.send(justificacion.archivo.datos);
    } catch (error) {
    console.error('Error al descargar el archivo:', error);
    res.status(500).send('Error al descargar el archivo');
    }
    });

export default router;

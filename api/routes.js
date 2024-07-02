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

router.get("/user", checkAuth, (req, res) => {
    res.render("user", {
        nombre: res.locals.user.nombre,
        apellido: res.locals.user.apellido,
        tipo_de_usuario: res.locals.user.tipo_de_usuario
    });
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
    const profesores = await Profesor.find({});
    const { nombre, apellido, tipo_de_usuario } = res.locals.user;
   // res.render("profes", { nombre, apellido, tipo_de_usuario });
    res.render('profes', { profesores: profesores }); // Cambiado a profes
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
            cursos: req.body.cursos,
            horarios: req.body.horarios,
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
        await Profesor.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/profes');
    } catch (error) {
        console.error('Error al actualizar el profesor:', error);
        res.status(500).send('Error al actualizar el profesor');
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
        const cursos = await Cursos.find({});
        res.render('cursos', { cursos, tipo_de_usuario: 'Administrador' });
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).send('Error al obtener los cursos');
    }
});

// Ruta para agregar un nuevo curso
router.post('/cursos', async (req, res) => {
    try {
        const nuevoCurso = new Cursos(req.body);
        await nuevoCurso.save();
        res.redirect('/cursos');
    } catch (error) {
        console.error('Error al agregar el curso:', error);
        res.status(500).send('Error al agregar el curso');
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

  

export default router;

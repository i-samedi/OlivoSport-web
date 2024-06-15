import express from 'express';
import Profesor from './schemas/profesorSchema.js';

const router = express.Router();

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

router.get("/justificaciones", checkAuth, (req, res) => {
    res.render("justificaciones", {tipo_de_usuario: 'Administrador'});
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
    const nuevoProfesor = new Profesor(req.body);
    await nuevoProfesor.save();
    res.redirect('/profes');
});

router.post('/profes/edit/:id', async (req, res) => {
    await Profesor.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/profes');
});

router.post('/profes/delete/:id', async (req, res) => {
    await Profesor.findByIdAndDelete(req.params.id);
    res.redirect('/profes');
});

/* router.get('/profesores', async (req, res) => {
    try {
        // Obtener todos los profesores de la colección
        const profesores = await collection.find().toArray();

        // Renderizar la vista con los datos de los profesores
        res.render('profesores', { profesores });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al obtener los profesores' });
    }
}); */


export default router;

import express from 'express';

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
    res.render("justificaciones");
});

router.get("/plantilla", checkAuth, (req, res) => {
    res.render("plantilla");
});

router.get("/cursos", checkAuth, (req, res) => {
    const { nombre, apellido, tipo_de_usuario } = res.locals.user;
    res.render("cursos", { nombre, apellido, tipo_de_usuario });
});

export default router;

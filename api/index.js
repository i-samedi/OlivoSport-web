import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bodyParser from "body-parser";
import mongoose from "./mongodb.js";
const collection = mongoose.model("usuarios");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'web', 'pages'));
app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname + '/../web'));

app.get("/menu", checkAuth, (req, res) => {
    res.render("menu");
});

function checkAuth(req, res, next) {
    if (req.session && req.session.userId) {
        // Si el usuario está autenticado, pasa al siguiente middleware
        return next();
    } else {
        // Si el usuario no está autenticado, redirige al inicio de sesión
        console.log("No esta autenticado");
        return res.redirect("/");
    }
}

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ rut: req.body.rut });
        
        if (check && check.password === req.body.password) {
            const nombre = check.nombre;
            const apellido = check.apellido;
            console.log("Nombre del usuario:", nombre, apellido);
            res.render("menu", { nombre: nombre, apellido: apellido });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
});

app.get("/menu", checkAuth,(req,res) => {
    res.sendFile(path.join(__dirname +  '/web/pages/menu.html'));
});

app.get("/user", checkAuth,(req,res) => {
    res.sendFile(path.join(__dirname +  '/../web/pages/user.html'));
});

app.get("/justificaciones", checkAuth,(req,res) => {
    res.sendFile(path.join(__dirname +  '/../web/pages/justificaciones.html'));
});

app.get("/plantilla", checkAuth,(req,res) => {
    res.sendFile(path.join(__dirname +  '/../web/pages/plantilla.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
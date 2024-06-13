import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bodyParser from "body-parser";
import mongoose from "./mongodb.js";
import session from "express-session";
import MongoStore from "connect-mongo";
const collection = mongoose.model("usuarios");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb+srv://pipemendez:rn0pWgRZJk4FJ9T7@olivossport.exmftev.mongodb.net/OlivosSportDB" }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  }));
app.use(bodyParser.json());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'web', 'pages'));
app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname + '/../web'));

//RUTAS PROTEGIDAS

function checkAuth(req, res, next) {
    if (req.session && req.session.userId) {
        console.log("sesion iniciada con exito")
        next();
    } else {
        console.log("Sesion no iniciada")
        res.redirect("/");
    }
    
}

app.get('/', (req,res) =>{
    res.render("index");
})

app.get("/menu", checkAuth, (req, res) => {
    res.render("menu");
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ rut: req.body.rut });
        
        if (check && check.password === req.body.password) {
            req.session.userId = check._id;
            const nombre = check.nombre;
            const apellido = check.apellido;
            const tipo_de_usuario = check.tipo_de_usuario;
            console.log(`Nombre del ${tipo_de_usuario}: ${nombre} ${apellido}`);
            res.render("menu", { nombre: nombre, apellido: apellido, tipo_de_usuario: tipo_de_usuario });
        } else {
            console.log("Usuario o contraseña incorrectos");
            res.redirect("/");
        }
    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
});

app.get('/logout', checkAuth, (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        console.log("Sesion cerrada con exito!");
        res.redirect('/');
    });
});

app.get("/menu", checkAuth,(req,res) => {
    res.render("menu");
});

app.get("/user", checkAuth,(req,res) => {
    res.render("user");
});

app.get("/justificaciones", checkAuth,(req,res) => {
    res.render("justificaciones")
});

app.get("/plantilla", checkAuth,(req,res) => {
    res.render("plantilla")
});

app.get("/cursos", checkAuth, (req,res) =>{
    res.render("cursos")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
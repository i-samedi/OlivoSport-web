import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bodyParser from "body-parser";
import mongoose from "./mongodb.js";
import session from "express-session";
import MongoStore from "connect-mongo";
const collection = mongoose.model("usuarios");
import usuarios from "./schemas/loginSchema.js";
import router from "./routes.js";

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

app.use(async (req, res, next) => {
    if (req.session && req.session.userId) {
        try {
            const user = await collection.findById(req.session.userId).lean();
            if (user) {
                res.locals.user = user;
            }
        } catch (err) {
            console.error(err);
        }
    }
    next();
});

//se importan las rutas del archivo routes.js
app.use(router);

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
import express, { Router } from "express";
import flash from 'connect-flash';

const app = express();
const port = 3000;

//para importar los archivos html
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import session from "express-session";
import cookieParser from "cookie-parser";
import {sequelize, db} from './models/db.js'
import { login, /* signup */ perm  } from './controllers/userController.js';
import { saveUser } from './middlewares/userAuth.js';

import dotenv from 'dotenv';
dotenv.config();

import createUser from "./models/createUser.js";

//config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/../web/pages')); // mostrar ejs
app.use(flash());


//middlewares

app.use(express.json()); //entender formato json
app.use(express.urlencoded({ extended: true })); //para entender los datos que llegan desde un formulario
app.use(express.static(__dirname + "/../web"));
app.use(
  session({
    secret: "olivosKey",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser())

//RESTRICCION MOMENTANEA DE ACCESO (HAY QUE MEJORARLA)
function authVer(req,res,next){
  if(perm){
    console.log('se logro')
    next();
  }else{
    console.log('no se logro')
    res.redirect('/');
  }
}

app.use((req,res,next)=>{
    app.locals.message = req.flash('unsuccess');
    next();
})


db.sequelize.sync({ force: true }).then(() => {
  console.log("db has been re sync")
  createUser(112345675, 'passworxdxd', 'admin', 'Chupete', 'Suazo');
  createUser(112345679, '123', 'admin', 'Alexis', 'Sanchez');
  createUser(201101751, '123', 'admin', 'Alexis', 'Sanchez')
})

//Rutas de la API
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/web/index.html"));
});

app.post('/login', login,  (req,res)=>{
    req.flash('user', req.body);
    res.redirect('/menu');
})

app.post('/logout', (req,res)=>{
  req.session.destroy();
})

//authVer es la restriccion a la ruta /menu, pero hay que mejorarla
app.get('/menu',authVer,(req,res)=>{
/*     const user = req.flash('user')[0];
    console.log(user); */
    res.sendFile(path.join(__dirname + "/../web/pages/menu.html"));
})

async function main(){
  try {
    await sequelize.authenticate();
    app.listen(port, () => {
      console.log(`The server is listening at http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Error to connect to database', error);
  }
}

main();

import express, { Router } from "express";
import flash from 'connect-flash';

const app = express();
const port = 3000;

//para importar los archivos html
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import session from "express-session";

//config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/../web/pages'));
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
var auth = function(req, res, next) {
    if (req.session && req.session.user === "201101751" && req.session.admin)
      return next();
    else
      return res.sendStatus(401);
  };


app.use((req,res,next)=>{
    app.locals.message = req.flash('success');
    next();
})

//Rutas de la API
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/web/index.html"));
});

app.post("/login", (req, res) => {
    //console.log(req.body);
    req.flash('user', req.body);
    req.flash('success', 'Ya estas Logeado !!');
    
    //comparar credenciales
    
    res.redirect('/menu');
});

app.get('/menu', (req,res)=>{
    const user = req.flash('user')[0];
    console.log(user);
    res.render('menu');
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

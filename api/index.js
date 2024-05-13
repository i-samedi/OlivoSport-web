import express, { Router } from "express";

const app = express();
const port = 3000;

//para importar los archivos html
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import session from "express-session";

//config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

//Rutas de la API
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/web/index.html"));
});

app.post("/login", (req, res) => {
  console.log(req.body);
  //req.session.my_variable = 'hello world';
  res.send("recived");
});

/* app.get('/profile', (req,res)=>{
    res.render('profile');
})
 */


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

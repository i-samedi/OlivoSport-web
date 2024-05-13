import express from "express"

//para importar los archivos html
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 3000

//middlewares
app.use(express.json()); //entender formato json
app.use(express.urlencoded({extended: false})); //para entender los datos que llegan desde un formulario

app.use(express.static(__dirname + '/../web'))



//Rutas de la API
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname +  '/web/index.html'))
})

app.post("/register", (req,res)=>{
    console.log(req.body)
    res.send('recived');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
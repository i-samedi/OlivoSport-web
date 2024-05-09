import express from "express"
import cors from "cors";

//para importar los archivos html
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 3000


app.use(express.static(__dirname+'/web'));


app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname+'/web/login.html'))
})

app.get("/register", (req,res) => {
    res.sendFile(path.join(__dirname+'/web/register.html'))
})

app.get("/admin", (req,res) =>{
    res.sendFile(path.join(__dirname+'/web/admin/admin.html'))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
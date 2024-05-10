import express from "express"

//para importar los archivos html
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 3000


app.use(express.static(__dirname + '/../web'))


app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname +  '/web/index.html'))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
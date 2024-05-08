const express = require('express');
const cors = require('cors');

//para importar los archivos html
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));




const app = express()
const port = 3000



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
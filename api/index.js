const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json({
    type: "*/*"
}))
app.use(cors())

app.get('/prueba', (req, res) => {
    res.send('Hello World!')
})

app.post('/login', (req, res) => {
    console.log("me esta llegando algo");
    const { username, password } = req.body;
    try {
        //verificar las credenciales del usuario
        const result = await pool.query(//insertar query
        );

        if (result.rows.length > 0) {
            //Usuario autenticado
            res.status(200).send('Inicio exitoso');
        } else {
            //Credenciales incorrectas
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).send('Error interno del servidor');
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

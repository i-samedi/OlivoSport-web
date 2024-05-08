const express = require('express')
const cors = require('cors')

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
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
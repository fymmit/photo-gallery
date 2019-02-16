const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 9000
const db = require('./db.js')

app.use(express.static('photos'))
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/images', (req, res) => {
    db.queryImageNames(images => {
        res.send(images)
    })
})

app.post('/imagenames', (req, res) => {
    db.insertImageNames(req.body.names)
    res.json(req.body)
})

app.listen(port, () => {
    console.log('Listening on port', port)
})
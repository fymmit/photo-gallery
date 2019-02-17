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

app.get('/images', async (req, res) => {
    res.send(await db.queryImageNames())
})

app.post('/images', (req, res) => {
    db.insertImageNames(req.body.names)
    res.json(req.body)
})

app.delete('/images', (req, res) => {
    db.deleteImage(req.body.name)
    res.json(req.body)
})

app.post

app.listen(port, () => {
    console.log('Listening on port', port)
})
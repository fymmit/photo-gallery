const express = require('express')
const app = express()
const cors = require('cors')
const port = 9000

app.use(express.static('photos'))
app.use(cors())

const images = [
    'patsas.jpg',
    'aita.jpg'
]

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/images', (req, res) => {
    res.send(images)
})

app.listen(port, () => {
    console.log('Listening on port', port)
})
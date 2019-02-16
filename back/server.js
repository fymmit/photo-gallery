const express = require('express')
const app = express()
const port = 9000

app.use(express.static('photos'))

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log('Listening on port', port)
})
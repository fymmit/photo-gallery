const app = require('express')()
const port = 9000

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log('Listening on port', port)
})
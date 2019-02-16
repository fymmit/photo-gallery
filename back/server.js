const app = require('express')()
const port = 9000

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/image/:name', (req, res) => {
    let options = {
        root: __dirname + '/photos/',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    let fileName = req.params.name
    res.sendFile(fileName, options, err => {
        err ? res.send(err.message) : console.log('Sent:', fileName)
    })
})

app.listen(port, () => {
    console.log('Listening on port', port)
})
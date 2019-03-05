const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const port = 9000
const files = require('./file-handler.js')
const db = require('./db.js')

app.use(express.static('photos'))
app.use(express.static('../front/build'))
app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload({
    limits: {
        fileSize: 4 * 1024 * 1024
    },
    abortOnLimit: true
}))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.get('/images', async (req, res) => {
    res.send(await db.queryImageNames())
})

app.post('/images', (req, res) => {
    let path
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let file = req.files.image
    let newName = `${Date.now()}${file.name.substring(file.name.lastIndexOf('.'))}`
    path = __dirname + '/photos/' + newName
    file.mv(path, async (err) => {
        if (err) return res.status(500).send(err)
        let fileType = await files.detectFileType(path)
        if (fileType && (fileType.mime == 'image/jpeg' || fileType.mime == 'image/png')) {
            db.insertImageNames([newName])
        } else {
            files.deleteFile(path)
        }
    })
    res.redirect('back')
})

app.delete('/images', (req, res) => {
    db.deleteImage(req.body.name)
    res.redirect('back')
})

app.listen(port, () => {
    console.log('Listening on port', port)
})
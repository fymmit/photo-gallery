const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')
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
    res.send(await db.getAll())
})

app.post('/images', (req, res) => {
    const tags = req.body.tags
    let path
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let file = req.files.image
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        let newName = `${Date.now()}`
        path = __dirname + '/photos/' + newName
        file.mv(path, async (err) => {
            if (err) return res.status(500).send(err)
            let fileType = await files.detectFileType(path)
            newName += '.' + fileType.ext
            fs.rename(path, path + '.' + fileType.ext, (err) => {
                if (err) console.log(err)
            })
            if (fileType && (fileType.mime == 'image/jpeg' || fileType.mime == 'image/png')) {
                db.insertImage(newName, tags, 0)
                res.status(201).send({
                    name: newName,
                    tags,
                    nsfw: 0
                })
            } else {
                files.deleteFile(path)
            }
        })
    } else {
        res.status(400).send('Try with an image.')
    }
})

app.delete('/images', (req, res) => {
    db.deleteImage(req.body.name)
    res.redirect('back')
})

app.listen(port, () => {
    console.log('Listening on port', port)
})
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const busboy = require('connect-busboy')
const fs = require('fs')
const port = 9000
const files = require('./file-handler.js')
const db = require('./db.js')

app.use(express.static('photos'))
app.use(cors())
app.use(bodyParser.json())
app.use(busboy({
    limits: {
        fileSize: 4 * 1024 * 1024
    }
}))

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/images', async (req, res) => {
    res.send(await db.queryImageNames())
})

app.post('/images', (req, res) => {
    let fstream
    let path
    let sizeLimitExceeded = false
    req.pipe(req.busboy)
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if (mimetype == 'image/jpeg' || mimetype == 'image/png') {
            let newName = `${Date.now()}${filename.substring(filename.lastIndexOf('.'))}`
            path = __dirname + '/photos/' + newName
            fstream = fs.createWriteStream(path)
            file.on('limit', function() {
                files.deleteFile(path)
                sizeLimitExceeded = true
            })
            file.pipe(fstream)
            fstream.on('close', async function() {
                if (!sizeLimitExceeded) {
                    let fileType = await files.detectFileType(path)
                    if (fileType && (fileType.mime == 'image/jpeg' || fileType.mime == 'image/png')) {
                        db.insertImageNames([newName])
                    } else {
                        files.deleteFile(path)
                    }
                }
            })
        }
        else {
            res.send('File type not allowed.')
        }
        req.busboy.on('finish', function() {
            res.redirect('back')
        })
    })
})

app.delete('/images', (req, res) => {
    db.deleteImage(req.body.name)
    res.redirect('back')
})

app.listen(port, () => {
    console.log('Listening on port', port)
})
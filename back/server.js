const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const files = require('./file-handler.js')
const db = require('./db.js')
const _ = require('ramda');

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
    const { tags } = req.query;
    if (tags) return res.send(await db.getImagesByTags(_.flatten([tags])));
    res.send(await db.getImages());
});

app.get('/tags/:id/images', async (req, res) => {
    res.send(':)');
});

app.get('/images/:id/tags', async (req, res) => {
    const { id } = req.params;
    res.send(await db.getTagsByImageId(id));
});

app.post('/images', (req, res) => {
    const tags = req.body.tags.toLowerCase().split(' ');
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
                db.insertImageComplete(newName, tags);
		res.status(201).send({
		    name: newName,
		});
            } else {
                files.deleteFile(path)
            }
        })
    } else {
        res.status(400).send('Try with an image.')
    }
})

app.delete('/images', (req, res) => {
    db.deleteImage(req.body.name).then(response => {
        res.status(200).send({
            name: response
        })
    }).catch(err => res.sendStatus(500))
})

app.get('/images/:id/comments', (req, res) => {
    const { id } = req.params;
    db.getComments(id).then(response => {
        res.status(200).send(response);
    }).catch(err => res.sendStatus(500));
});

app.post('/images/:id/comments', (req, res) => {
    const { id } = req.params;
    const { author, comment } = req.body;
    console.log(author, comment, id);
    db.insertComment(author, comment, id).then(response => {
        res.status(200).send({
            author,
            comment,
        })
    }).catch(err => res.sendStatus(500));
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});

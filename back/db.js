const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/images.db')

db.run('CREATE TABLE if not exists images(name text, tags text, nsfw integer)')

function insertImageNames(names) {
    let placeholders = names.map(name => '(?)').join(',');
    let sql = 'INSERT INTO images(name) VALUES ' + placeholders;
    db.run(sql, names, function(err) {
        if (err) throw err
        console.log(`A row has been inserted with rowid ${this.lastID}`)
    })
}

function insertImage(name, tags, nsfw) {
    let sql = `INSERT INTO images (name, tags, nsfw) VALUES ('${name}', '${tags}', ${nsfw})`
    db.run(sql, function(err) {
        if (err) console.log(err)
        console.log(`A row has been inserted with rowid ${this.lastID}`)
    })
}

function queryImageNames() {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT name FROM images'
        db.all(sql, [], (err, rows) => {
            if (err) reject(err)
            resolve(rows.map(row => row.name))
        })
    })
}

function getAll() {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM images'
        db.all(sql, [], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function deleteImage(name) {
    let sql = 'DELETE FROM images WHERE name = ?'
    db.run(sql, name, function(err) {
        if (err) throw err
        console.log(`Row(s) deleted ${this.changes}`)
    })
}

module.exports = {
    insertImageNames,
    queryImageNames,
    getAll,
    deleteImage,
    insertImage
}

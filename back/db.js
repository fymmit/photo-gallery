const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/images.db')

db.run('CREATE TABLE if not exists images(name text)')

function insertImageNames(names) {
    let placeholders = names.map(name => '(?)').join(',');
    let sql = 'INSERT INTO images(name) VALUES ' + placeholders;
    db.run(sql, names, function(err) {
        if (err) throw err
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
    deleteImage
}

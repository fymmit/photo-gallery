const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/images.db')

function insertImageNames(names) {
    let placeholders = names.map(name => '(?)').join(',');
    let sql = 'INSERT INTO images(name) VALUES ' + placeholders;
    db.run(sql, names, function(err) {
        if (err) throw err
        console.log(`A row has been inserted with rowid ${this.lastID}`)
    })
}

function queryImageNames(callback) {
    let sql = 'SELECT name FROM images'
    db.all(sql, [], (err, rows) => {
        if (err) throw err
        callback(rows.map(row => row.name))
    })
}

module.exports = {
    insertImageNames,
    queryImageNames
}

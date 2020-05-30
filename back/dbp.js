const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/prac.db');

const createTable = () => {
  let sql =
    'CREATE TABLE if not exists test(id INTEGER PRIMARY KEY, name TEXT, tags TEXT)';
  db.run(sql);
};

const getAll = () => {
  let sql = 'SELECT * FROM test';
  db.all(sql, [], (err, rows) => {
    if (err) console.log(err);
    rows.forEach((row) => console.log(row));
  });
};

const getWithName = (name) => {
  return new Promise((res, rej) => {
    let sql = `SELECT * FROM test WHERE name = '${name}'`;
    db.get(sql, (err, row) => {
      if (err) rej(err);
      res(row);
    });
  });
};

const insertData = (id, name, tags) => {
  let sql = `INSERT INTO test (id, name, tags) VALUES (${id}, '${name}', '${tags}')`;
  db.run(sql, function (err) {
    if (err) console.log(err);
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
};

const addTags = async (name, tags) => {
  let oldEntry = await getWithName(name);
  let oldTags = oldEntry.tags;
  let sql = `UPDATE test SET tags = '${oldTags} ${tags}' WHERE name = '${name}'`;
  db.run(sql, (err) => {
    if (err) console.log(err);
  });
};

const main = () => {
  // createTable()
  getAll();
  // addTags('lol.jpg', 'epical meme')
  // insertData(61, 'epic.jpg')
};

main();

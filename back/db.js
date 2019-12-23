const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/images.db');
const _ = require('ramda');

db.run('CREATE TABLE if not exists image(imageid INTEGER PRIMARY KEY, name text NOT NULL)');
db.run('CREATE TABLE if not exists tag(tagid INTEGER PRIMARY KEY, tag text UNIQUE NOT NULL)');
db.run('CREATE TABLE if not exists imagetag(fk_imageid INTEGER NOT NULL, fk_tagid INTEGER NOT NULL)');
db.run('CREATE TABLE if not exists comment(commentid INTEGER PRIMARY KEY, author TEXT, comment TEXT, fk_imageid INTEGER NOT NULL)');

const insertTags = (tags) => {
    return new Promise((resolve, reject) => {
	db.all('SELECT * from tag', (err, rows) => {
	    const existingTags = [...rows];
	    const newTags = tags.filter(tag => !existingTags.map(e => e.tag).includes(tag));
	    const tagPlaceholders = newTags.map(t => '(?)').join(',');
	    let tagSql = `
		INSERT INTO tag (tag)
		VALUES ${tagPlaceholders}
	    `;
	    if (newTags.length > 0) {
		db.run(tagSql, newTags, function(err) {
		    if (err) reject(err);
		    db.all(`select * from tag
			where tag IN (${newTags.map(t => '?').join(',')})`,
			newTags, 
			function(err, rows) {
			    if (err) reject(err);
			    const tagIds = rows.map(r => r.tagid)
				.concat(existingTags
				.filter(et => tags.includes(et.tag)).map(e => e.tagid));
			    resolve(tagIds);
			}
		    );
		});
	    } else {
		resolve(existingTags.filter(et => tags.includes(et.tag)).map(e => e.tagid));
	    }
	})
    });
}

const insertImage = (name) => {
    return new Promise((resolve, reject) => {
	let imageSql = `
	    INSERT INTO image (name)
	    VALUES (?)`; 
	db.run(imageSql, name, function (err) {
	    if (err) reject(err);
	    resolve(this.lastID);
	    });
    });
}

const insertImageTags = (imageId, tagIds) => {
    const values = _.flatten(tagIds.map(x => [imageId, x]));
    const valuePlaceholders = tagIds.map(x => '(?, ?)').join(',');
    return new Promise((resolve, reject) => {
	db.run(`
	    INSERT INTO imagetag (fk_imageid, fk_tagid)
	    VALUES ${valuePlaceholders}
	`, values, function (err) {
	    if (err) reject(err); 
	    resolve();
	});
    });
}

const insertImageComplete = async (name, tags) => {
    const imageId = await insertImage(name);
    const tagIds = await insertTags(tags);
    insertImageTags(imageId, tagIds);
}

function getImages() {
    return new Promise((res, rej) => {
        let sql = 'SELECT * FROM image';
        db.all(sql, [], function(err, rows) {
            if (err) rej(err);
            res(rows);
        });
    });
};

const getImagesByTags = (tags) => {
    return new Promise((res, rej) => {
        let sql = `
            select name, imageid, tag
	    from image
            join imagetag on fk_imageid=imageid
            join tag on tagid=fk_tagid
        `;
        db.all(sql, [], function(err, rows) {
            if (err) rej(err);
	    const arr = [];
	    rows.forEach(r => {
		if (arr[r.imageid]) arr[`${r.imageid}`].push(r.tag);
		else arr[r.imageid] = [r.tag];
	    });
	    const grouped = arr.map((x, i) => {return { imageid: i, tags: x }});
	    const searchResult = grouped.filter(
		a => tags.every(tag => a.tags.includes(tag))).map(x => {
		    const { name, imageid } = rows.find(row => x.imageid === row.imageid);
		    return { imageid, name }
		});
            res(searchResult);
        });
    });
};

function deleteImage() {
    throw new Error('Not implemented.');
}

function getTagsByImageId(id) {
    return new Promise((res, rej) => {
        let sql = 
        `select tag
        from tag
        join imagetag as it on it.fk_tagid = tag.tagid
        join image on image.imageid = it.fk_imageid
        where image.imageid = ?`
        db.all(sql, [id], function(err, rows) {
            if (err) rej(err);
            res(rows);
        });
    });
};

function getTags() {
    return new Promise((res, rej) => {
        let sql = 'SELECT * FROM tag';
        db.all(sql, [], function(err, rows) {
            if (err) rej(err);
            res(rows);
        });
    });
};

const getComments = (fk_imageid) => {
    return new Promise((res, rej) => {
        let sql = `SELECT * FROM comment where fk_imageid=(?)`;
        db.all(sql, [fk_imageid], function(err, rows) {
            if (err) rej(err);
            res(rows);
        });
    });
};

const insertComment = (author, comment, fk_imageid) => {
    return new Promise((resolve, reject) => {
        let sql = `
            INSERT INTO comment (author, comment, fk_imageid)
            VALUES (?, ?, ?)`;
        db.run(sql, [author, comment, fk_imageid], function (err) {
            if (err) reject(err);
            resolve(this.lastID);
        });
    });
};

module.exports = {
    insertImage,
    getTagsByImageId,
    getImages,
    getTags,
    getImagesByTags,
    insertTags,
    insertImageTags,
    insertImageComplete,
    insertComment,
    getComments,
}


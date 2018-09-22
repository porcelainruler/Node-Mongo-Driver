const assert = require('assert');

// *** Method-3 (Using a File Based Module - Included Promises to Solve Callback Hell) ***
// Returned part is handled in index.js file 

exports.insertDocument = (db , document , collection , callback) => {
    const coll = db.collection(collection);
    return coll.insert(document);  // callback removed and returned for promise
};

exports.findDocuments = (db , collection , callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();  // callback removed and returned for promise
};

exports.removeDocument = (db , document , collection , callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);  // callback removed and returned for promise
};

exports.updateDocument = (db , document , update ,  collection , callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document , { $set: update} , null);  // callback removed and returned for promise
};


/*   *** Method-2 (Using a File Based Module) ***
exports.insertDocument = (db , document , collection , callback) => {
    const coll = db.collection(collection);
    coll.insert(document , (err , result) => {
        assert.equal(err , null);

        console.log('Insert ' + result.result.n + 
            ' document into the collection ' + collection);
        callback(result);
        
    });
};

exports.findDocuments = (db , collection , callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err , docs) => {
        assert.equal(err , null);
        callback(docs);
    });
};

exports.removeDocument = (db , document , collection , callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document , (err , result) => {
        assert.equal(err , null);
        console.log('Removed the document ' , document);
        callback(result);
    });
};

exports.updateDocument = (db , document , update ,  collection , callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document , { $set: update} , null , (err , result) => {
        assert.equal(err , null);
        console.log('Updated the documnet with ' , document);
        callback(result);
    });
};
*/
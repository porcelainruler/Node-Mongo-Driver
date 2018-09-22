const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');
const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url).then((db) => {

    console.log('Connected correctly to the Server');
  // *** Method-3 (Using a File Based Module - Included Promises to Solve Callback Hell) ***
    dboper.insertDocument(db , { "name": "Capacino", "description": "Test"} , 
        "dishes")
        .then((result) => {
            console.log('Inserted Documnet:\n' , result.ops);

            return dboper.findDocuments(db , "dishes");             // Returned Promise
        })

        .then((docs) => {                                           // takes return from above
            console.log('Found Documents:\n', docs);                // and carryon call 

            return dboper.updateDocument(db , {"name": "Capacino"} ,
                    { "description": "Updated Test" } , "dishes");
        })

        .then((result) => {
            console.log('Updated Document:\n' , result.result);

            return dboper.findDocuments(db , "dishes");
        })

        .then((docs) => {
            console.log('Found Udated Documents:\n', docs);
                        
            return db.dropCollection("dishes");
        })

        .then((result) => {
            console.log("Dropped Collection: " , result);

            db.close();
        })

        .catch((err) => {console.log(err)})
                       
    } , (err) => { console.log(err) })
        .catch((err) => {console.log(err)});    

    


    /*   *** Method-2 (Using a File Based Module) ***
    const collection = db.collection('dishes');

    dboper.insertDocument(db , { "name": "Capacino", "description": "Test"} , 
        "dishes" , (result) => {
            console.log('Inserted Documnet:\n' , result.ops);

            dboper.findDocuments(db , "dishes" , (docs) => {
                console.log('Found Documents:\n', docs);

                dboper.updateDocument(db , {"name": "Capacino"} ,
                    { "description": "Updated Test" } , "dishes" ,
                    (result) => {
                        console.log('Updated Document:\n' , result.result);

                        dboper.findDocuments(db , "dishes" , (docs) => {
                            console.log('Found Udated Documents:\n', docs);
                        
                            db.dropCollection("dishes" , (result) => {
                                console.log("Dropped Collection: " , result);

                                db.close();
                            });
                        });    
                    });
            });
        });
    */    



    /*    *** Method - 1 (Normal    Without Creating a File based Module) ***
    const collection = db.collection('dishes');

    collection.insertOne({"name": "Uthapizza", "description": "test"} ,
        (err , result) => {
            assert.equal(err , null);

            console.log("After Insert:\n");
            console.log(result.ops);

            collection.find({}).toArray((err , docs) => {
                assert.equal(err , null);

                console.log("Found:\n");
                console.log(docs);

                db.dropCollection('dishes' , (err , result) => {
                    assert.equal(err , null);

                    db.close();
                })
            })
        });
    */    
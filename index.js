const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');
const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url , (err , db) => {

    assert.equal(err , null);

    console.log('Connected correctly to the Server');

    const collection = db.collection('dishes');
    
    //   *** Method-2 (Using a File Based Module) ***
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




    /*    *** Method - 1 (Normal    Without Creating a File based Module) ***

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
});
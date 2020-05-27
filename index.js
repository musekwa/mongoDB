const MongoClient =  require("mongodb");
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "confusion";

MongoClient.connect(url, (err, client)=>{

    assert.equal(err, null);

    console.log("Connected successfully");
    const db = client.db(dbname);

    dboper.insertDocument(db, {name: "Vadonut", description: "Tese"}, "dishes", (result)=>{
        console.log("Insert Document:\n", result.ops);

        dboper.findDocuments(db, "dishes", (docs)=>{
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, {name: "Vadonut"}, {description: "Updated Test"}, "dishes", (result)=>{
                console.log("Updated Documents:\n", result.result);

                dboper.findDocuments(db, "dishes", (docs)=>{
                    console.log("Found Documents\n", docs);

                    db.dropCollection("dishes", (result)=>{
                        console.log("Dropped Collection: ", result)

                        client.close();
                    })
                })
            })
        })
    })
});
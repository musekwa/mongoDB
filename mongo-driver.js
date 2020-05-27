const MongoClient =  require("mongodb");
const assert = require("assert");
//const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "users";

MongoClient.connect(url, (err, client)=>{

    assert.equal(err, null);

    console.log("Connected successfully");
    const db = client.db(dbname);
    const collection = db.collection("dishes");

    collection.insertOne({"username": "iguna", "exercise": []}, (err, result)=>{
        assert.equal(err, null);

        console.log("After insert");
        console.log(result.ops);

        collection.find({}).toArray((err, docs)=>{
            assert.equal(err, null);

            console.log(docs);

            db.dropCollection("users", (err, result)=>{
                assert.equal(err, null);

                client.close();
            })
        })
    })
});
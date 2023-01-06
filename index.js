const express = require('express')
require('dotenv').config()
const { MongoClient } = require("mongodb");


const app = express()
const port = 3000
const url = process.env.url;
const client = new MongoClient(url);
const dbName = "test";


app.get('/proxy', (req, res) => {

(async ()=> {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("proxy");

    const p = await col.find({}).toArray(function(err, result) {
        if (err) throw err;
        
  res.json(result)
        db.close();
      });
})()


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
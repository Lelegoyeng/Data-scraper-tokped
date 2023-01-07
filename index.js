const express = require('express')
require('dotenv').config()
const { MongoClient } = require("mongodb");
const fs = require('fs');

const app = express()
const port = 3000
const url = process.env.url;
const client = new MongoClient(url);
const dbName = "test";

let hasil = []

app.get('/proxy', (req, res) => {

  (async () => {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("proxy");
    let array = []

    const p = await col.find({}).toArray(function (err, result) {
      if (err) throw err;


      res.json(result)

      array = result
      let data = JSON.stringify(array, null, 2);
      fs.writeFile('proxy.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });

      db.close();
    });
  })()


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const cheerio = require('cheerio');
require('dotenv').config()
const { MongoClient } = require("mongodb");


const url = process.env.url;
const client = new MongoClient(url);
const dbName = "test";

let barray = 7
let tip = 1
let tport = 2
let checkdb = false

function one() {
  return new Promise(async resolve => {
    const url = "https://free-proxy-list.net/";
    const randomAgent = randomUseragent.getRandom();
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
      //    headless: false
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.setJavaScriptEnabled(true);
    await page.setUserAgent(randomAgent);
    await page.goto(url, { waituntil: 'domcontentloaded', timeout: 0 });

    const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('table tr td'))
      return tds.map(td => td.innerText)

    });

    //db connection
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("proxy");

    if(checkdb === false){
      db.dropCollection('proxy')
      checkdb = true
    }

    let personDocument = {
      "ip": data[barray + tip],
      "port": data[barray + tport],
      "country": data[barray + tport + 2],

    }

    //db insert
    const p = await col.insertOne(personDocument);
    console.log(p.insertedId)


    // console.log(data[barray+tip]) 
    // console.log(data[barray+tport])
    // console.log(data[barray+tport+2])


    await browser.close();
    resolve();
  });
}

let level = 1
// let temp = 2557
let temp = 1000

const run = (async () => {
  await Promise.all([one()])
    .then(s => {
      //  console.log(barray)
      setTimeout(() => {
        temp == 0 ? process.exit(0) : temp--
        barray = barray + 7
        tip = tip + 1
        tport = tport + 1
        level++
        run()
      }, 1)
    })
})

run()

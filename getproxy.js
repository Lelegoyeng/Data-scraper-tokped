const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const cheerio = require('cheerio');

let barray = 7
let tip = 1
let tport = 2 

  function one(){
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
    
      
      console.log(data)
    
        // console.log(data[barray+tip]) //1
        // console.log(data[barray+tport]) //2 
        // console.log(data[2]) 
        // console.log(data[3])
        // console.log(data[4])
        // console.log(data[5])
        // console.log(data[6])
        // console.log(data[7])
        // console.log(data[8])
        // console.log(data[9]) 
    
        await browser.close();
      resolve();
    });
  }

let level = 1
let temp = 20

const run = (async ()=> {
  await Promise.all([one()])
  .then(s=> {
    //  console.log(barray)
    setTimeout(()=> {
      temp == 0 ? process.exit(0) : temp--
        barray = barray + 7
        tip = tip + 1
        tport = tport + 1
        level++
        run()
    },1000)
  })
})

run()

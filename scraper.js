const axios = require('axios')
const cheerio = require('cheerio')
const { error } = require('console')
const fs = require('fs')
const { stringify } = require('querystring')

let url = "https://www.goodreads.com/quotes"


const parsedData = []
let pagesScraped = 10
const maxPage = 100
if (pagesScraped>maxPage){
    console.log("Error: pages to be scraped exceeds max number of pages on website")
}else{

    for (let i=1; i<=pagesScraped; i++){
        url=url+`?page=${i}`
        axios.get(url)
    .then(response=>{
        console.log("successfully connected")
        let $ = cheerio.load(response.data)
        $('.quoteText').each((index, element)=>{
            
            const filteredTxt = $(element).contents().filter(function(){
                return this.type ==='text'
            }).text().replace(/\n/g,'').replace('      ―','').trim()

            if(filteredTxt){
                parsedData.push(i, filteredTxt)
            }

        })

        const parsedJson = JSON.stringify(parsedData, null, 2)
        fs.writeFileSync('quotes.json',parsedJson,'utf-8')


    }).catch(error=>{
        console.log("Can't connect. Error:", error)
    })

        
        url="https://www.goodreads.com/quotes"
    }

}

    
const axios = require('axios')
const cheerio = require('cheerio')
const { error } = require('console')
const fs = require('fs')
const { stringify } = require('querystring')

let url = "https://www.goodreads.com/quotes"

axios.get(url)
    .then(response=>{
        console.log("successfully connected")
        let $ = cheerio.load(response.data)
        const parsedData = []
        let x = 0
        $('.quoteText').each((index, element)=>{
            x = x+1
            //console.log(x)
            const filteredTxt = $(element).contents().filter(function(){
                return this.type ==='text'
            }).text().trim()

            if(filteredTxt){
                parsedData.push(index, filteredTxt)
            }

        })
        console.log(parsedData)

        const parsedJson = JSON.stringify(parsedData, null, 2)
        fs.writeFileSync('quotes.json',parsedJson,'utf-8')


    }).catch(error=>{
        console.log("Can't connect. Error:", error)
    })
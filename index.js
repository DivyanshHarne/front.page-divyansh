import axios from "axios"
import cheerio from "cheerio"
import express from "express"

const PORT = process.env.PORT || 5000
const app = express()

const URL = 'https://news.ycombinator.com/'

axios(URL)
    .then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData)
        const articles = []

        $('.titleline', htmlData).each((index, element) => {
            const title = $(element).children('a').text()
            const titleURL = $(element).children('a').attr('href')
            articles.push({
                title,
                titleURL
            })
        })
        console.log(articles)
    }).catch(err => console.error(err))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

const axios = require('axios');
const cheerio = require('cheerio');

const scrapeStories = async () => {
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
};

module.exports = scrapeStories;
import * as rp from 'request-promise'
import * as cheerio from 'cheerio'
import { getScrapedData } from './api/scrapers'
import { writeScrapedData } from './api/writers'

(async () => {
    console.log('Scrapin\' we go!')

    const options = {
        uri: `https://en.wikipedia.org/wiki/Boeing_747`,
        transform: body => cheerio.load(body)
    }

    try {
        const scraper = await rp(options)
        const data = getScrapedData(scraper)
        await writeScrapedData(data)
        console.dir(data, {depth: null})
    } catch (error) {
        console.error(error)
    }

    console.log('Finished scraping!')
})()
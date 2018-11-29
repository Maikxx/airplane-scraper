import * as request from 'request-promise'
import { getScrapedData } from './api/scrapers'
import { writeScrapedData } from './api/writers'
import { getQueryOptions } from './api/queries'

(async () => {
    console.time('Finished scraping in')
    console.log('Scrapin\' we go!')

    try {
        const urls = [
            `https://en.wikipedia.org/wiki/Airbus_A380`,
            `https://en.wikipedia.org/wiki/Antonov_An-225_Mriya`,
            `https://en.wikipedia.org/wiki/Boeing_737_MAX`,
            `https://en.wikipedia.org/wiki/Boeing_747`,
            `https://en.wikipedia.org/wiki/Boeing_777`,
            `https://en.wikipedia.org/wiki/Boeing_787_Dreamliner`,
            `https://en.wikipedia.org/wiki/Fokker_70`,
            `https://en.wikipedia.org/wiki/Fokker_100`,
        ]

        const data = await Promise.all(urls.map(async url => {
            const scraper = await request(getQueryOptions(url))
            return getScrapedData(scraper)
        }))

        await writeScrapedData(data)
        console.dir(data, { depth: null })
    } catch (error) {
        console.error(error)
    }

    console.timeEnd('Finished scraping in')
})()

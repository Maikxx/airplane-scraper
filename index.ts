import * as request from 'request-promise'
import { scrapeAirplanePage, scrapeAirplaneUrls } from './api/scrapers'
import { writeScrapedData } from './api/writers'
import { getQueryOptions } from './api/queries'
import { flatten } from './api/utils/flatten'
import { convertToUsableUrl } from './api/transformers'

(async () => {
    console.time('Finished scraping in')
    console.log('Scrapin\' we go!')

    try {
        const airplaneListUrls = [
            'https://en.wikipedia.org/wiki/List_of_civil_aircraft',
            // 'https://en.wikipedia.org/wiki/List_of_large_aircraft',
            // 'https://en.wikipedia.org/wiki/List_of_fighter_aircraft',
            // 'https://en.wikipedia.org/wiki/List_of_individual_aircraft',
        ]

        const scrapedAirplaneUrls = await Promise.all(airplaneListUrls.map(async url => {
            const scraper = await request(getQueryOptions(url))
            return scrapeAirplaneUrls(scraper)
        })) as string[][]

        const flatScrapedAirplaneUrls = flatten(scrapedAirplaneUrls)
        const usableScrapedUrls = flatScrapedAirplaneUrls
            .map(convertToUsableUrl)
            .filter(url => !!url)

        // const data = await Promise.all(airplaneUrls.map(async url => {
        //     const scraper = await request(getQueryOptions(url))
        //     return scrapeAirplanePage(scraper)
        // }))

        // await writeScrapedData(data)
        console.dir(usableScrapedUrls, { depth: null })
    } catch (error) {
        console.error(error)
    }

    console.timeEnd('Finished scraping in')
})()

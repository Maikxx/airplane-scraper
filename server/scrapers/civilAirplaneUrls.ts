import * as request from 'request-promise'
import { getQueryOptions } from '../queries'
import { convertToUsableUrl } from '../transformers'
import { scrapeAirplanePage } from './individualPlane'

export const scrapeCivilAirplaneUrls = async (): Promise<void> => {
    const listUrl = `https://en.wikipedia.org/wiki/List_of_civil_aircraft`
    const hrefScraper = await request(getQueryOptions(listUrl))

    hrefScraper('h3 + ul li a:first-child')
        .each(async (i2: any, anchorElement: CheerioElement) => {
            const href = await hrefScraper(anchorElement).attr('href')
            const usableUrl = convertToUsableUrl(href)

            if (!usableUrl) {
                return null
            }

            scrapeAirplanePage(usableUrl)
        })
        .get()
}

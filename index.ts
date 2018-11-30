import * as fs from 'fs'
import { scrapeCivilAirplaneUrls } from './api/scrapers/civilAirplaneUrls'

export const dataFile = fs.createWriteStream('data/planes.json')

; (async () => {
    console.log('Scrapin\' we go!')
    dataFile.write('[')

    try {
        scrapeCivilAirplaneUrls()
    } catch (error) {
        console.error(error)
    }
})()

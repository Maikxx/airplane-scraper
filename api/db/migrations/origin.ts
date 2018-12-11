import { MongoAirplane } from '../../models/airplane'
import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'

const { promisify } = util
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const Airplane = require('../../models/airplane')
const dataFilePath = path.resolve(__dirname, '../../../data/planes.json')

export const cleanOrigin = (origin: string): string => {
    if (origin.includes('United States') && origin.includes('Canada')) {
        return 'North America'
    }

    const translationKeys = {
        'Soviet Union': 'Soviet Union',
        USSR: 'Soviet Union',
        'People\'s Republic': 'China',
        Argentine: 'Argentina',
        Czechoslovakia: 'Czech Republic',
        '/': 'Multi-national',
        and: 'Multi-national',
        ',': 'Multi-national',
        '(': 'Multi-national',
        'United Kingdom': 'United Kingdom',
        Britain: 'United Kingdom',
        'Russian Federation': 'Russia',
        USA: 'United States of America',
        US: 'United States of America',
        'United States': 'United States of America',
        America: 'United States of America',
        'Ten-seat': undefined,
    }

    const filteredTranslationKeys = Object
        .keys(translationKeys)
        .filter(key => origin.includes(key))

    if (filteredTranslationKeys && filteredTranslationKeys.length > 0) {
        return translationKeys[filteredTranslationKeys[0]]
    }

    if (origin.includes('[')) {
        return origin.slice(0, origin.indexOf('['))
    }

    return origin
}

export const migrateAirplaneOrigins = async () => {
    const fileBuffer = await readFile(dataFilePath)
    const fileData = await JSON.parse(fileBuffer.toString())
    const docs = await Airplane.find({})
    const newFileData = await Promise.all(docs.map(async (doc: MongoAirplane) => {
        const { origin, title } = doc._doc

        /**
         * Store to Mongo
         */
        // if (!origin || !origin.length) {
        //     return null
        // }

        // const cleanedOrigin = cleanOrigin(origin)

        // if (origin === cleanedOrigin) {
        //     return null
        // }

        // await Airplane.updateOne({ _id }, { $set: { origin: cleanedOrigin }})

        /**
         * Store to file
         */
        const currentPlane = await fileData.filter(ap => ap.title === title)[0]

        if (currentPlane) {
            currentPlane.origin = origin
        }

        return currentPlane
    }))

    await writeFile(dataFilePath, JSON.stringify(newFileData))
}

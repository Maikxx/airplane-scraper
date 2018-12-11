import { MongoAirplane } from '../../models/airplane'
import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'

const { promisify } = util
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const Airplane = require('../../models/airplane')
const dataFilePath = path.resolve(__dirname, '../../../data/planes.json')

const getTextTillOccuranceOfToken = (text: string, token: string, index: number): string => {
    const firstIndex = text.indexOf(token)

    if (firstIndex === -1) {
        return text
    }

    if (index > 1) {
        const indexToRemove = text.indexOf(token, firstIndex + index - 1)

        if (indexToRemove === -1) {
            return text
        }

        return text
            .slice(0, indexToRemove)
            .trim()
    }

    return text.slice(0, firstIndex)
}

export const cleanManufacturer = (manufacturer: string): string => {
    const lowerCaseName = manufacturer.toLowerCase()

    const translationKeys = {
        agusta: 'Agusta Westland',
        ['advance aircraft']: 'Advance Aircraft Company',
        ['siat mbb ca']: 'SIAT MBB CASA',
        aeronca: 'Aeronca Aircraft',
        ['alexander schleicher']: 'Alexander Schleicher GmbH & Co',
        ['armstrong whitworth']: 'Armstrong Whitworth Aircraft',
        arado: 'Arado Flugzeugwerke',
        ['arrow aircraft and motor']: 'Arrow Aircraft and Motors',
        bellanca: 'AviaBellanca Aircraft',
        ['bac later bae and bae systems']: 'BAC',
        blackburn: 'Blackburn Aircraft',
        ['british aircraft']: 'British Aircraft Company',
        ['britten norman']: 'Britten-Norman',
        general: 'General Aircraft',
        ['lior et olivier']: 'Lior et Olivier',
        nvkoolhoven: 'Koolhoven',
        pzl: 'PZL',
        ['north american']: 'North American Aviation',
        phillips: 'Phillips and Powis Aircraft',
        picairn: 'Pitcairn',
        ['united aircraft']: 'United Aircraft Corporation',
        ['xian aircraft industrial corporation']: 'Xian Aircraft Industrial Corporation',
    }

    const filteredTranslationKeys = Object
        .keys(translationKeys)
        .filter(key => lowerCaseName.includes(key))

    if (filteredTranslationKeys.length > 0) {
        return translationKeys[filteredTranslationKeys[0]]
    }

    if (manufacturer.includes('later')) {
        return getTextTillOccuranceOfToken(manufacturer, 'later', 1)
    }

    if (manufacturer.includes('  ')) {
        return getTextTillOccuranceOfToken(manufacturer, '  ', 1)
    }

    const removeAfterFirstSpace = [
        'aeg',
        'auster',
        'aviastar',
        'antonov',
        'avro',
        'beriev',
        'boisavia',
        'boeing',
        'bombardier',
        'breguet',
        'bristol',
        'brochet',
        'buhl',
        'cantieri',
        'caudron',
        'cessna',
        'cirrus',
        'curtiss',
        'dwl',
        'dornier',
        'eclipse',
        'extra',
        'fairchild',
        'farman',
        'found',
        'fournier',
        'grumann',
        'gulfstream',
        'harbin',
        'hawker',
        'heinkel',
        'howard',
        'junkers',
        'keystone',
        'klemm',
        'latcore',
        'letov',
        'lockheed',
        'leoning',
        'meyers',
        'mil helicopters',
        'mil moscow',
        'monocoupe',
        'mooney',
        'northrop',
        'pzl',
        'parnall',
        'percival',
        'piper',
        'pitcairn',
        'rans',
        'rearwin',
        'robinson',
        'rohrbach',
        'ryan',
        'saunders',
        'scheibe',
        'schneider',
        'sud',
        'supermarine',
        'tashkent',
        'travel',
        'tupolev',
        'wassmer',
        'weatherly',
    ]

    const transformedShortManufacturers = removeAfterFirstSpace
        .filter(text => lowerCaseName.includes(text))
        .map(() => getTextTillOccuranceOfToken(manufacturer, ' ' , 1))[0]

    if (!transformedShortManufacturers || transformedShortManufacturers !== manufacturer) {
        return transformedShortManufacturers
    }

    const removeAfterSecondSpace = [
        'aero spacelines',
        'aero vodochody',
        'avions mudry',
        'bede aviation',
        'consolidated aircraft',
        'constructions aronautiques',
        'construcciones aeronuticas',
        'de havilland',
        'diamond aircraft',
        'fleet aircraft',
        'george parnall',
        'granville brothers',
        'handley page',
        'kellett autogiro',
        'luscombe aircraft',
        'pacific aerospace',
        'short brothers',
        'sopwith aviation',
        'spartan aircraft',
        'stinson aircraft',
    ]

    const transformedLongManufacturers = removeAfterSecondSpace
        .filter(text => lowerCaseName.includes(text))
        .map(() => getTextTillOccuranceOfToken(manufacturer, ' ' , 2))[0]

    if (!transformedLongManufacturers || transformedLongManufacturers !== manufacturer) {
        return transformedLongManufacturers
    }

    const removeExcessTokens = (company: string): string => {
        return company
            .replace(/[^a-zA-Z ]/g, '')
            .replace('LTD', '')
            .replace('Limited', '')
            .replace('ltd', '')
            .replace('Ltd', '')
            .trim()
    }

    const multipleManufacturers = manufacturer.match(/[a-z][A-Z]+/g)

    if (lowerCaseName.includes('inc') && lowerCaseName.indexOf('inc') === lowerCaseName.length - 3) {
        return manufacturer
            .slice(0, manufacturer.length - 3)
            .trim()
    }

    if (multipleManufacturers && multipleManufacturers.length > 0) {
        const splitIndex = manufacturer.indexOf(multipleManufacturers[0]) + 1
        const firstManufacturer = manufacturer.slice(0, splitIndex)

        return removeExcessTokens(firstManufacturer)
    }

    return removeExcessTokens(manufacturer)
}

export const migrateAirplaneManufacturers = async () => {
    const fileBuffer = await readFile(dataFilePath)
    const fileData = await JSON.parse(fileBuffer.toString())
    const docs = await Airplane.find({})
    const newFileData = await Promise.all(docs.map(async (doc: MongoAirplane) => {
        const { _id, manufacturedBy, title } = doc._doc

        /**
         * Store to Mongo
         */
        // if (!manufacturedBy || !manufacturedBy.length) {
        //     return null
        // }

        // const cleanedManufacturer = cleanManufacturer(manufacturedBy)

        // if (manufacturedBy === cleanedManufacturer) {
        //     return null
        // }

        // await Airplane.updateOne({ _id }, { $set: { manufacturedBy: cleanedManufacturer }})

        /**
         * Store to file
         */
        const currentPlane = await fileData.filter(ap => ap.title === title)[0]

        if (currentPlane) {
            currentPlane.manufacturedBy = manufacturedBy
        }

        return currentPlane
    }))

    await writeFile(dataFilePath, JSON.stringify(newFileData))
}

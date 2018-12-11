import { MongoAirplane } from '../../models/airplane'
import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'

const { promisify } = util
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const Airplane = require('../../models/airplane')
const dataFilePath = path.resolve(__dirname, '../../../data/planes.json')

export const cleanManufacturer = (manufacturer: string): string => {
    const lowerCaseName = manufacturer.toLowerCase()

    if (lowerCaseName.includes('aero spacelines')) {
        return 'Aero Spacelines'
    }

    if (lowerCaseName.includes('agusta')) {
        return 'Agusta Westland'
    }

    if (lowerCaseName.includes('advance aircraft')) {
        return 'Advance Aircraft Company'
    }

    if (lowerCaseName.includes('aero vodochody')) {
        return 'Aero Vodochody'
    }

    if (lowerCaseName.includes('siat mbb ca')) {
        return 'SIAT MBB CASA'
    }

    if (lowerCaseName.includes('aeronca')) {
        return 'Aeronca Aircraft'
    }

    if (lowerCaseName.includes('alexander schleicher')) {
        return 'Alexander Schleicher GmbH & Co'
    }

    if (lowerCaseName.includes('armstrong whitworth')) {
        return 'Armstrong Whitworth Aircraft'
    }

    if (lowerCaseName.includes('arado')) {
        return 'Arado Flugzeugwerke'
    }

    if (lowerCaseName.includes('arrow aircraft and motor')) {
        return 'Arrow Aircraft and Motors'
    }

    if (lowerCaseName.includes('avions mudry')) {
        return 'Avions Mudry'
    }

    if (lowerCaseName.includes('bellanca')) {
        return 'AviaBellanca Aircraft'
    }

    if (lowerCaseName.includes('bac later bae and bae systems')) {
        return 'BAC'
    }

    if (lowerCaseName.includes('bede aviation')) {
        return 'Bede Aviation'
    }

    if (lowerCaseName.includes('blackburn')) {
        return 'Blackburn Aircraft'
    }

    if (lowerCaseName.includes('british aircraft')) {
        return 'British Aircraft Company'
    }

    if (lowerCaseName.includes('britten norman')) {
        return 'Britten-Norman'
    }

    if (lowerCaseName.includes('consolidated aircraft')) {
        return 'Consolidated Aircraft'
    }

    if (lowerCaseName.includes('constructions aronautiques')) {
        return 'Constructions Aronautiques'
    }

    if (lowerCaseName.includes('construcciones aeronuticas')) {
        return 'Construcciones Aeronuticas'
    }

    if (lowerCaseName.includes('de havilland')) {
        return 'De Havilland'
    }

    if (lowerCaseName.includes('diamond aircraft')) {
        return 'Diamond Aircraft'
    }

    if (lowerCaseName.includes('fleet aircraft')) {
        return 'Fleet Aircraft'
    }

    if (lowerCaseName.includes('general')) {
        return 'General Aircraft'
    }

    if (lowerCaseName.includes('george parnall')) {
        return 'George Parnall'
    }

    if (lowerCaseName.includes('granville brothers')) {
        return 'Granville Brothers'
    }

    if (lowerCaseName.includes('handley page')) {
        return 'Handley Page'
    }

    if (lowerCaseName.includes('kellett autogiro')) {
        return 'Kellett Autogiro'
    }

    if (lowerCaseName.includes('lior et olivier')) {
        return 'Lior et Olivier'
    }

    if (lowerCaseName.includes('luscombe aircraft')) {
        return 'Luscombe Aircraft'
    }

    if (lowerCaseName.includes('nvkoolhoven')) {
        return 'Koolhoven'
    }

    if (lowerCaseName.includes('pzl')) {
        return 'PZL'
    }

    if (lowerCaseName.includes('pacific aerospace')) {
        return 'Pacific Aerospace'
    }

    if (lowerCaseName.includes('north american')) {
        return 'North American Aviation'
    }

    if (lowerCaseName.includes('phillips')) {
        return 'Phillips and Powis Aircraft'
    }

    if (lowerCaseName.includes('picairn')) {
        return 'Pitcairn'
    }

    if (lowerCaseName.includes('short brothers')) {
        return 'Short Brothers'
    }

    if (lowerCaseName.includes('sopwith aviation')) {
        return 'Sopwith Aviation'
    }

    if (lowerCaseName.includes('spartan aircraft')) {
        return 'Spartan Aircraft'
    }

    if (lowerCaseName.includes('stinson aircraft')) {
        return 'Stinson Aircraft'
    }

    if (lowerCaseName.includes('united aircraft')) {
        return 'United Aircraft Corporation'
    }

    if (lowerCaseName.includes('xian aircraft industrial corporation')) {
        return 'Xian Aircraft Industrial Corporation'
    }

    if (manufacturer.includes('later')) {
        return manufacturer
            .slice(0, manufacturer.indexOf('later'))
            .trim()
    }

    if (manufacturer.includes('  ')) {
        return manufacturer
            .slice(0, manufacturer.indexOf('  '))
            .trim()
    }

    if (
        lowerCaseName.includes('aeg')
        || lowerCaseName.includes('auster')
        || lowerCaseName.includes('aviastar')
        || lowerCaseName.includes('antonov')
        || lowerCaseName.includes('avro')
        || lowerCaseName.includes('beriev')
        || lowerCaseName.includes('boisavia')
        || lowerCaseName.includes('boeing')
        || lowerCaseName.includes('bombardier')
        || lowerCaseName.includes('breguet')
        || lowerCaseName.includes('bristol')
        || lowerCaseName.includes('brochet')
        || lowerCaseName.includes('buhl')
        || lowerCaseName.includes('cantieri')
        || lowerCaseName.includes('caudron')
        || lowerCaseName.includes('cessna')
        || lowerCaseName.includes('cirrus')
        || lowerCaseName.includes('curtiss')
        || lowerCaseName.includes('dwl')
        || lowerCaseName.includes('dornier')
        || lowerCaseName.includes('eclipse')
        || lowerCaseName.includes('extra')
        || lowerCaseName.includes('fairchild')
        || lowerCaseName.includes('farman')
        || lowerCaseName.includes('found')
        || lowerCaseName.includes('fournier')
        || lowerCaseName.includes('grumann')
        || lowerCaseName.includes('gulfstream')
        || lowerCaseName.includes('harbin')
        || lowerCaseName.includes('hawker')
        || lowerCaseName.includes('heinkel')
        || lowerCaseName.includes('howard')
        || lowerCaseName.includes('junkers')
        || lowerCaseName.includes('keystone')
        || lowerCaseName.includes('klemm')
        || lowerCaseName.includes('latcore')
        || lowerCaseName.includes('letov')
        || lowerCaseName.includes('lockheed')
        || lowerCaseName.includes('leoning')
        || lowerCaseName.includes('meyers')
        || lowerCaseName.includes('mil helicopters')
        || lowerCaseName.includes('mil moscow')
        || lowerCaseName.includes('monocoupe')
        || lowerCaseName.includes('mooney')
        || lowerCaseName.includes('northrop')
        || lowerCaseName.includes('pzl')
        || lowerCaseName.includes('parnall')
        || lowerCaseName.includes('percival')
        || lowerCaseName.includes('piper')
        || lowerCaseName.includes('pitcairn')
        || lowerCaseName.includes('rans')
        || lowerCaseName.includes('rearwin')
        || lowerCaseName.includes('robinson')
        || lowerCaseName.includes('rohrbach')
        || lowerCaseName.includes('ryan')
        || lowerCaseName.includes('saunders')
        || lowerCaseName.includes('scheibe')
        || lowerCaseName.includes('schneider')
        || lowerCaseName.includes('sud')
        || lowerCaseName.includes('supermarine')
        || lowerCaseName.includes('tashkent')
        || lowerCaseName.includes('travel')
        || lowerCaseName.includes('tupolev')
        || lowerCaseName.includes('wassmer')
        || lowerCaseName.includes('weatherly')
    ) {
        const hasSpace = manufacturer.indexOf(' ') > -1

        if (hasSpace) {
            return manufacturer.slice(0, manufacturer.indexOf(' '))
        }
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
    // const fileBuffer = await readFile(dataFilePath)
    // const fileData = await JSON.parse(fileBuffer.toString())
    const docs = await Airplane.find({})
    const newFileData = await Promise.all(docs.map(async (doc: MongoAirplane) => {
        const { _id, manufacturedBy, title } = doc._doc

        /**
         * Store to Mongo
         */
        if (!manufacturedBy || !manufacturedBy.length) {
            return null
        }

        const cleanedManufacturer = cleanManufacturer(manufacturedBy)

        if (manufacturedBy === cleanedManufacturer) {
            return null
        }

        await Airplane.updateOne({ _id }, { $set: { manufacturedBy: cleanedManufacturer }})

        /**
         * Store to file
         */
        // const currentPlane = await fileData.filter(ap => ap.title === title)[0]

        // if (currentPlane) {
        //     currentPlane.manufacturedBy = manufacturedBy
        // }

        // return currentPlane
    }))

    // await writeFile(dataFilePath, JSON.stringify(newFileData))
}

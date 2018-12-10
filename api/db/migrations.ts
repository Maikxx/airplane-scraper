import { MongoAirplane } from '../models/airplane'
import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'

const { promisify } = util
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const Airplane = require('../models/airplane')
const dataFilePath = path.resolve(__dirname, '../../data/planes.json')

const cleanOrigin = (origin: string): string => {
    if (origin.includes('United States') && origin.includes('Canada')) {
        return 'North America'
    }

    if (origin.includes('Soviet Union') || origin.includes('USSR')) {
        return 'Soviet Union'
    }

    if (origin.includes('People\'s Republic')) {
        return 'China'
    }

    if (origin === 'Argentine') {
        return 'Argentina'
    }

    if (origin.includes('Czechoslovakia')) {
        return 'Czech Republic'
    }

    if (origin.includes('/') || origin.includes('and') || origin.includes(',') || origin.includes('(') || origin.includes('&')) {
        return 'Multi-national'
    }

    if (origin.includes('United Kingdom') || origin.includes('Britain')) {
        return 'United Kingdom'
    }

    if (origin.includes('Russian Federation')) {
        return 'Russia'
    }

    if (origin === 'USA' || origin === 'US' || origin === 'United States' || origin.includes('United States') || origin === 'America') {
        return 'United States of America'
    }

    if (origin.includes('[')) {
        return origin.slice(0, origin.indexOf('['))
    }

    if (origin.includes('Ten-seat')) {
        return undefined
    }

    return origin
}

const migrateAirplaneOrigins = async () => {
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

export const runMigrations = async () => {
    // await migrateAirplaneOrigins()
}

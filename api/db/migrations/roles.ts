import { MongoAirplane } from '../../models/airplane'
import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'

const { promisify } = util
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const Airplane = require('../../models/airplane')
const dataFilePath = path.resolve(__dirname, '../../../data/planes.json')

export const cleanRole = (role: string): string => {
    const translationKeys = {
        'flying boat': 'Flying boat',
        aerobatic: 'Aerobatics',
        agricultural: 'Agricultural',
        airliner: 'Airliner',
        amateur: 'Homebuilt',
        amphibian: 'Amphibian',
        amphibious: 'Amphibian',
        biplane: 'Biplane',
        bomber: 'Bomber',
        business: 'Business',
        cargo: 'Transport',
        civil: 'Airliner',
        commercial: 'Airliner',
        experimental: 'Experimental',
        helicopter: 'Helicopter',
        homebuilt: 'Homebuilt',
        personal: 'Personal',
        racer: 'Sport',
        racing: 'Sport',
        sailplane: 'Sailplane',
        sport: 'Sport',
        tour: 'Touring',
        trainer: 'Trainer',
        training: 'Trainer',
        transport: 'Transport',
        utility: 'Utility',
    }

    const filteredTranslationKeys = Object
        .keys(translationKeys)
        .filter(key => role.toLowerCase().includes(key))

    if (filteredTranslationKeys && filteredTranslationKeys.length > 0) {
        return translationKeys[filteredTranslationKeys[0]]
    }

    return 'Other'
}

export const migrateAirplaneRoles = async (): Promise<void> => {
    const fileBuffer = await readFile(dataFilePath)
    const fileData = await JSON.parse(fileBuffer.toString())
    const docs = await Airplane.find({})
    const newFileData = await Promise.all(docs.map(async (doc: MongoAirplane) => {
        const { role, title } = doc._doc

        // /**
        //  * Store to Mongo
        //  */
        // if (!role || !role.length) {
        //     return null
        // }

        // const cleanedRole = cleanRole(role)

        // if (role === cleanedRole) {
        //     return null
        // }

        // await Airplane.updateOne({ _id }, { $set: { role: cleanedRole }})

        /**
         * Store to file
         */
        const currentPlane = await fileData.filter(ap => ap.title === title)[0]

        if (currentPlane) {
            currentPlane.role = role
        }

        return currentPlane
    }))

    await writeFile(dataFilePath, JSON.stringify(newFileData))
}

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
    if (role.toLowerCase().includes('aerobatic')) {
        return 'Aerobatics'
    }

    if (role.toLowerCase().includes('agricultural')) {
        return 'Agricultural'
    }

    if (role.includes('Amphibian') || role.includes('Amphibious')) {
        return 'Amphibian'
    }

    if (role.toLowerCase().includes('bomber')) {
        return 'Bomber'
    }

    if (role.toLowerCase().includes('biplane')) {
        return 'Biplane'
    }

    if (role.toLowerCase().includes('utility')) {
        return 'Utility'
    }

    if (role.toLowerCase().includes('transport') || role.toLowerCase().includes('cargo')) {
        return 'Transport'
    }

    if (role.toLowerCase().includes('sport') || role.toLowerCase().includes('racing') || role.toLowerCase().includes('racer')) {
        return 'Sport'
    }

    if (role.toLowerCase().includes('trainer') || role.toLowerCase().includes('training')) {
        return 'Trainer'
    }

    if (role.toLowerCase().includes('personal')) {
        return 'Personal'
    }

    if (role.toLowerCase().includes('homebuilt') || role.toLowerCase().includes('amateur')) {
        return 'Homebuilt'
    }

    if (role.toLowerCase().includes('airliner') || role.toLowerCase().includes('commercial') || role.toLowerCase().includes('civil')) {
        return 'Airliner'
    }

    if (role.toLowerCase().includes('business')) {
        return 'Business'
    }

    if (role.toLowerCase().includes('tour')) {
        return 'Touring'
    }

    if (role.toLowerCase().includes('flying boat')) {
        return 'Flying boat'
    }

    if (role.toLowerCase().includes('sailplane')) {
        return 'Sailplane'
    }

    if (role.toLowerCase().includes('experimental')) {
        return 'Experimental'
    }

    if (role.toLowerCase().includes('helicopter')) {
        return 'Helicopter'
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

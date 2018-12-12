import { MongoAirplane } from '../../models/airplane'
const Airplane = require('../../models/airplane')
import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'

const { promisify } = util
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const dataFilePath = path.resolve(__dirname, '../../../data/planes.json')

const cleanUsageStatus = (usageStatus: string): string => {
    const statusWithoutNewlines = usageStatus.replace('\n', '')
    const translationKeys = {
        active: 'In service',
        cancel: 'Cancelled',
        crashed: 'Crashed',
        destroyed: 'Destroyed',
        development: 'In development',
        display: 'Preserved in storage',
        'in production': 'In production',
        'in service': 'In service',
        'still flying': 'In service',
        scrapped: 'Cancelled',
        stored: 'Preserved in storage',
        revived: 'Revived',
        retired: 'Retired',
        unknown: 'Unknown',
    }

    const filteredTranslationKeys = Object
        .keys(translationKeys)
        .filter(key => statusWithoutNewlines.toLowerCase().includes(key))

    if (filteredTranslationKeys && filteredTranslationKeys.length > 0) {
        return translationKeys[filteredTranslationKeys[0]]
    }

    if (
        (
            statusWithoutNewlines.toLowerCase().includes('in')
            || statusWithoutNewlines.toLowerCase().includes('still')
        ) && (
            statusWithoutNewlines.toLowerCase().includes('use')
            || statusWithoutNewlines.toLowerCase().includes('service')
            || statusWithoutNewlines.toLowerCase().includes('flying')
            || statusWithoutNewlines.toLowerCase().includes('airworthy')
        )
    ) {
        return translationKeys['in service']
    }

    return 'Other'
}

export const migrateAirplaneUsageStatus = async () => {
    const docs = await Airplane.find({})
    const fileBuffer = await readFile(dataFilePath)
    const fileData = await JSON.parse(fileBuffer.toString())
    const newFileData = await Promise.all(docs.map(async (doc: MongoAirplane) => {
        const { _id, usageStatus, title } = doc._doc

        // /**
        //  * Store to Mongo
        //  */
        // if (!usageStatus || !usageStatus.length) {
        //     return null
        // }

        // const cleanedUsageStatus = cleanUsageStatus(usageStatus)

        // if (usageStatus === cleanedUsageStatus) {
        //     return null
        // }

        // await Airplane.updateOne({ _id }, { $set: { usageStatus: cleanedUsageStatus }})

        /**
         * Store to file
         */
        const currentPlane = await fileData.filter(ap => ap.title === title)[0]

        if (currentPlane) {
            currentPlane.usageStatus = usageStatus
        }

        return currentPlane
    }))

    await writeFile(dataFilePath, JSON.stringify(newFileData))
}

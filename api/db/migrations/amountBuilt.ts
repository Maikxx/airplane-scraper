import { MongoAirplane } from '../../models/airplane'
const Airplane = require('../../models/airplane')
import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'
import { convertToNumber } from '../../utils/String.prototype'

const { promisify } = util
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const dataFilePath = path.resolve(__dirname, '../../../data/planes.json')

const cleanAmountBuilt = (amountBuilt: string): number => {
    const retreiveNumbersFromStringRegex = /(\d+(\,*\.*)\d*)/g
    const amountBuiltNumbers = amountBuilt.match(retreiveNumbersFromStringRegex)

    if (!amountBuiltNumbers || amountBuiltNumbers.length === 0) {
        return 0
    }

    const cleanedAmountBuilt = convertToNumber(amountBuiltNumbers[0])

    return cleanedAmountBuilt
}

export const migrateAirplaneAmountBuilt = async (): Promise<void> => {
    const fileBuffer = await readFile(dataFilePath)
    const fileData = await JSON.parse(fileBuffer.toString())
    const docs = await Airplane.find({})
    const newFileData = await Promise.all(docs.map(async (doc: MongoAirplane) => {
        const { _id, amountBuilt, title } = doc._doc

        /**
         * Store to Mongo
         */
        // if (!amountBuilt || !amountBuilt.length) {
        //     return null
        // }

        // const cleanedAmountBuilt = cleanAmountBuilt(amountBuilt)

        // await Airplane.updateOne({ _id }, { $set: { amountBuilt: cleanedAmountBuilt }})

        // /**
        //  * Store to file
        //  */
        const currentPlane = await fileData.filter(airplane => airplane.title === title)[0]

        if (currentPlane) {
            currentPlane.amountBuilt = amountBuilt
        }

        return currentPlane
    }))

    await writeFile(dataFilePath, JSON.stringify(newFileData))
}

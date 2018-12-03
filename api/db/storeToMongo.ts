import * as mongoose from 'mongoose'
import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'
const Airplane = require('../models/airplane')

const { promisify } = util
const readFile = promisify(fs.readFile)

export const storeToMongo = async () => {
    try {
        const fileBuffer = await readFile(path.resolve(__dirname, '../../data/planes.json'))
        const planes = JSON.parse(fileBuffer.toString())

        await Promise.all(planes.map(async plane => {
            const airplane = await new Airplane({
                _id: new mongoose.Types.ObjectId(),
                ...plane,
            })

            await airplane.save()
        }))
    } catch (error) {
        console.error(error)
    }
}

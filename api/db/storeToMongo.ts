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
        const airplanes = JSON.parse(fileBuffer.toString())

        await Promise.all(airplanes.map(async airplane => {
            const mongoAirplane = await new Airplane({
                _id: new mongoose.Types.ObjectId(),
                ...airplane,
            })

            await mongoAirplane.save()
        }))
    } catch (error) {
        console.error(error)
    }
}

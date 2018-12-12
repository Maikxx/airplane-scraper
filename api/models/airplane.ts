import * as mongoose from 'mongoose'
import { AirplaneType } from '../types/Airplane'

export interface MongoAirplane {
    '&__': any
    isNew: boolean
    errors?: any
    _doc: AirplaneType
}

const airplaneScheme = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
    },
    imageSrc: {
        type: String,
    },
    role: {
        type: String,
    },
    origin: {
        type: String,
    },
    manufacturedBy: {
        type: String,
    },
    firstFlight: {
        type: String,
    },
    usageStatus: {
        type: String,
    },
    primaryUsers: {
        type: [String],
    },
    productionYears: {
        type: String,
    },
    amountBuilt: {
        type: String,
    },
})

module.exports = mongoose.model('Airplane', airplaneScheme)

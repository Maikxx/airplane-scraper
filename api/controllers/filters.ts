import { Request, Response, NextFunction } from 'express'
import { MongoError } from 'mongodb'
const Airplane = require('../models/airplane')

export const getRoles = (request: Request, response: Response, next: NextFunction) => {
    Airplane.find({ role: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('role')
        .exec((err: MongoError, roles) => {
            if (err) {
                return onError(err, response)
            }

            response
                .status(200)
                .json(roles)
        })
}

export const getOrigins = (request: Request, response: Response, next: NextFunction) => {
    Airplane.find({ origin: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('origin')
        .exec((err: MongoError, origins) => {
            if (err) {
                return onError(err, response)
            }

            response
                .status(200)
                .json(origins)
        })
}

export const getManufacturers = (request: Request, response: Response, next: NextFunction) => {
    Airplane.find({ manufacturedBy: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('manufacturedBy')
        .exec((err: MongoError, manufacturers) => {
            if (err) {
                return onError(err, response)
            }

            response
                .status(200)
                .json(manufacturers)
        })
}

export const getUsageStatuses = (request: Request, response: Response, next: NextFunction) => {
    Airplane.find({ usageStatus: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('usageStatus')
        .exec((err: MongoError, usageStatuses) => {
            if (err) {
                return onError(err, response)
            }

            response
                .status(200)
                .json(usageStatuses)
        })
}

const onError = (error: MongoError, response: Response) => {
    response
        .status(500)
        .json(error)

    return null
}

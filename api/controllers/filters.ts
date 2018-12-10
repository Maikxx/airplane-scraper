import * as express from 'express'
const Airplane = require('../models/airplane')

export const getRoles = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Airplane.find({ role: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('role')
        .exec((err, roles) => {
            if (err) {
                res.status(500).json(err)
                return null
            }

            res.status(200).json(roles)
        })
}

export const getOrigins = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Airplane.find({ origin: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('origin')
        .exec((err, origins) => {
            if (err) {
                res.status(500).json(err)
                return null
            }

            res.status(200).json(origins)
        })
}

export const getManufacturers = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Airplane.find({ manufacturedBy: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('manufacturedBy')
        .exec((err, manufacturers) => {
            if (err) {
                res.status(500).json(err)
                return null
            }

            res.status(200).json(manufacturers)
        })
}

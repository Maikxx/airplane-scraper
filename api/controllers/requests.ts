import { Request, Response } from 'express'
import { MongoError } from 'mongodb'
import { onError } from './error'
import { AirplaneType } from '../models/airplane'
import { getQueryFilters } from './filters'
const Airplane = require('../models/airplane')

export const getAirplanes = (request: Request, response: Response) => {
    const { query } = request
    const { page: queryPage, limit: queryLimit, filters: queryFilters } = query

    const page = queryPage
        ? parseInt(queryPage, 10)
        : 0

    const limit = queryLimit
        ? parseInt(queryLimit, 10)
        : 20

    const parsedQueryFilters = queryFilters && JSON.parse(queryFilters)
    const filters = getQueryFilters(query, parsedQueryFilters)

    Airplane.countDocuments(filters, (err: MongoError, count?: number) => {
        Airplane.find(filters)
            .skip(page * limit)
            .limit(limit)
            .exec((err: MongoError, docs: AirplaneType[]) => {
                if (err) {
                    return onError(err, response)
                }

                const hasNextPage = page < count / 20
                const data = {
                    totalCount: count,
                    hasNextPage,
                    nodes: docs,
                }

                response
                    .status(200)
                    .json(data)
            })
    })
}

export const getRoles = (request: Request, response: Response) => {
    Airplane.find({ role: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('role')
        .exec((err: MongoError, roles?: string[]) => {
            if (err) {
                return onError(err, response)
            }

            response
                .status(200)
                .json(roles)
        })
}

export const getOrigins = (request: Request, response: Response) => {
    Airplane.find({ origin: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('origin')
        .exec((err: MongoError, origins?: string[]) => {
            if (err) {
                return onError(err, response)
            }

            response
                .status(200)
                .json(origins)
        })
}

export const getManufacturers = (request: Request, response: Response) => {
    Airplane.find({ manufacturedBy: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('manufacturedBy')
        .exec((err: MongoError, manufacturers?: string[]) => {
            if (err) {
                return onError(err, response)
            }

            response
                .status(200)
                .json(manufacturers)
        })
}

export const getUsageStatuses = (request: Request, response: Response) => {
    Airplane.find({ usageStatus: { $nin: [ undefined, null, '', '\n' ]}})
        .distinct('usageStatus')
        .exec((err: MongoError, usageStatuses?: string[]) => {
            if (err) {
                return onError(err, response)
            }

            response
                .status(200)
                .json(usageStatuses)
        })
}

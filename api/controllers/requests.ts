import { Request, Response } from 'express'
import { onError } from './error'
import { AirplaneType } from '../models/airplane'
import { getQueryFilters, QueryFilters } from './filters'
const Airplane = require('../models/airplane')

export interface Query {
    limit?: string
    page?: string
    searchText?: string
    filters?: string
}

export const getAirplanes = async (request: Request, response: Response): Promise<void> => {
    const { query } = request
    const { page: queryPage, limit: queryLimit, filters: queryFilters } = query as Query

    const page = queryPage
        ? parseInt(queryPage, 10)
        : 0

    const limit = queryLimit
        ? parseInt(queryLimit, 10)
        : 20

    const parsedQueryFilters = queryFilters && JSON.parse(queryFilters) as QueryFilters
    const filters = getQueryFilters(query, parsedQueryFilters)

    try {
        const count = await Airplane.countDocuments(filters) as number
        const docs = await Airplane.find(filters)
            .skip(page * limit)
            .limit(limit) as AirplaneType[]

        const hasNextPage = page < count / 20
        const data = {
            totalCount: count,
            hasNextPage,
            nodes: docs,
        }

        response.status(200).json(data)
    } catch (error) {
        return onError(error, response)
    }
}

export const getRoles = async (request: Request, response: Response) => {
    try {
        const roles = await Airplane.find({ role: { $nin: [ undefined, null, '', '\n' ]}})
            .distinct('role') as string[]

        response.status(200).json(roles)
    } catch (error) {
        return onError(error, response)
    }
}

export const getOrigins = async (request: Request, response: Response) => {
    try {
        const origins = await Airplane.find({ origin: { $nin: [ undefined, null, '', '\n' ]}})
            .distinct('origin') as string[]

        response.status(200).json(origins)
    } catch (error) {
        return onError(error, response)
    }
}

export const getManufacturers = async (request: Request, response: Response) => {
    try {
        const manufacturers = await Airplane.find({ manufacturedBy: { $nin: [ undefined, null, '', '\n' ]}})
            .distinct('manufacturedBy') as string[]

        response.status(200).json(manufacturers)
    } catch (error) {
        return onError(error, response)
    }
}

export const getUsageStatuses = async (request: Request, response: Response) => {
    try {
        const usageStatuses = await Airplane.find({ usageStatus: { $nin: [ undefined, null, '', '\n' ]}})
            .distinct('usageStatus') as string[]

        response.status(200).json(usageStatuses)
    } catch (error) {
        return onError(error, response)
    }
}

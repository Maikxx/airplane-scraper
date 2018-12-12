import { Request, Response } from 'express'
import { onError } from './error'
import { MongoError } from 'mongodb'
import { AirplaneType } from '../models/airplane'
const Airplane = require('../models/airplane')

interface Query {
    limit?: string
    page?: string
    searchText?: string
    filters?: string
}

interface QueryFilters {
    filterByAirplaneHasImages?: boolean
    filterByAirplaneManufacturer?: string
    filterByAirplaneOrigin?: string
    filterByAirplaneRole?: string
    filterByAirplaneUsageStatus?: string
}

const getSearchFilter = (query: Query) => {
    const { searchText } = query

    return { ...(searchText && { title: { $regex: new RegExp(searchText, 'i') }}) }
}

const getAirplaneImageFilter = (parsedQueryFilters?: QueryFilters) => {
    const filterByAirplaneHasImages = parsedQueryFilters && parsedQueryFilters.filterByAirplaneHasImages
    return { ...(filterByAirplaneHasImages && { imageSrc: { $exists: true, $ne: undefined }}) }
}

const getRoleFilter = (parsedQueryFilters?: QueryFilters) => {
    const filterByAirplaneRole = parsedQueryFilters && parsedQueryFilters.filterByAirplaneRole
    return { ...(filterByAirplaneRole && { role: { $regex: new RegExp(filterByAirplaneRole, 'i') }}) }
}

const getOriginFilter = (parsedQueryFilters?: QueryFilters) => {
    const filterByAirplaneOrigin = parsedQueryFilters && parsedQueryFilters.filterByAirplaneOrigin
    return { ...(filterByAirplaneOrigin && { origin: { $regex: new RegExp(filterByAirplaneOrigin, 'i') }}) }
}

const getManufacturerFilter = (parsedQueryFilters?: QueryFilters) => {
    const filterByAirplaneManufacturer = parsedQueryFilters && parsedQueryFilters.filterByAirplaneManufacturer
    return { ...(filterByAirplaneManufacturer && { manufacturedBy: { $regex: new RegExp(filterByAirplaneManufacturer, 'i') }}) }
}

const getUsageStatusFilter = (parsedQueryFilters?: QueryFilters) => {
    const filterByAirplaneUsageStatus = parsedQueryFilters && parsedQueryFilters.filterByAirplaneUsageStatus
    return { ...(filterByAirplaneUsageStatus && { manufacturedBy: { $regex: new RegExp(filterByAirplaneUsageStatus, 'i') }}) }
}

const getQueryFilters = (query: Query, parsedQueryFilters?: QueryFilters) => {
    return {
        ...(getSearchFilter(query)),
        ...(getAirplaneImageFilter(parsedQueryFilters)),
        ...(getRoleFilter(parsedQueryFilters)),
        ...(getOriginFilter(parsedQueryFilters)),
        ...(getManufacturerFilter(parsedQueryFilters)),
        ...(getUsageStatusFilter(parsedQueryFilters)),
    }
}

export const getAirplanes = (request: Request, response: Response) => {
    const { query } = request
    const { page: queryPage, limit: queryLimit, filters: queryFilters } = query

    const page = queryPage && parseInt(queryPage, 10) || 0
    const limit = queryLimit && parseInt(queryLimit, 10) || 20
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

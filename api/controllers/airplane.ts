import * as express from 'express'
const Airplane = require('../models/airplane')

interface QueryFilters {
    filterByAirplaneHasImages?: boolean
    filterByAirplaneManufacturer?: string
    filterByAirplaneOrigin?: string
    filterByAirplaneRole?: string
}

const getSearchFilter = (query: any) => {
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

const getQueryFilters = (query: any, parsedQueryFilters?: QueryFilters) => {
    return {
        ...(getSearchFilter(query)),
        ...(getAirplaneImageFilter(parsedQueryFilters)),
        ...(getRoleFilter(parsedQueryFilters)),
        ...(getOriginFilter(parsedQueryFilters)),
        ...(getManufacturerFilter(parsedQueryFilters)),
    }
}

export const getAirplanes = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { query } = req
    const { page: queryPage, limit: queryLimit, filters: queryFilters } = query

    const page = queryPage && parseInt(queryPage, 10) || 0
    const limit = queryLimit && parseInt(queryLimit, 10) || 20
    const parsedQueryFilters = queryFilters && JSON.parse(queryFilters)
    const filters = getQueryFilters(query, parsedQueryFilters)

    Airplane.countDocuments(filters, (err, count) => {
        Airplane.find(filters)
            .skip(page * limit)
            .limit(limit)
            .exec((err, docs) => {
                if (err) {
                    res.status(500).json(err)
                    return null
                }

                const hasNextPage = page < count / 20
                const response = {
                    totalCount: count,
                    hasNextPage,
                    nodes: docs,
                }

                res.status(200).json(response)
            })
    })
}

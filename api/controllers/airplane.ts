import * as express from 'express'
import { capitalize } from '../utils/string'
const Airplane = require('../models/airplane')

export const get = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { query } = req
    const { page: queryPage, limit: queryLimit, searchText, filters: queryFilters } = query

    const page = queryPage && parseInt(queryPage, 10) || 0
    const limit = queryLimit && parseInt(queryLimit, 10) || 20
    const search = searchText && capitalize(searchText)
    const parsedQueryFilters = queryFilters && JSON.parse(queryFilters)
    const filterByAirplaneHasImages = parsedQueryFilters && parsedQueryFilters.filterByAirplaneHasImages

    const searchFilter = { title: { $regex: search }}
    const filterByAirplaneHasImagesFilter = { imageSrc: { $exists: true, $ne: undefined }}

    const filters = {
        ...(!!search && searchFilter),
        ...(filterByAirplaneHasImages && filterByAirplaneHasImagesFilter),
    }

    Airplane.countDocuments(filters, (err, count) => {
        Airplane.find(filters)
                .skip(page * limit)
                .limit(limit)
                .exec((err, docs) => {
                    if (err) {
                        res.status(500).json(err)
                        return
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

import * as express from 'express'
import { capitalize } from '../utils/string'
const Airplane = require('../models/airplane')

export const get = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { query } = req
    const { page: queryPage, limit: queryLimit, searchText } = query

    const page = queryPage && parseInt(queryPage, 10) || 0
    const limit = queryLimit && parseInt(queryLimit, 10) || 20
    const search = searchText && capitalize(searchText)

    const filters = {
        ...(!!search && { title: { $regex: search }}),
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

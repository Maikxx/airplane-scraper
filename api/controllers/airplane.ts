import * as express from 'express'
const Airplane = require('../models/airplane')

export const get = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const page = req.query.page !== undefined && parseInt(req.query.page, 10) || 0
    const limit = req.query.limit !== undefined && parseInt(req.query.limit, 10) || 20
    const search = req.query.searchText && `${req.query.searchText[0].toUpperCase()}${req.query.searchText.slice(1)}`

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

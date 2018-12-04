import * as express from 'express'
const Airplane = require('../models/airplane')

export const get = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const page = req.query.page || 0
    const limit = req.query.limit || 20

    Airplane.countDocuments({}, (err, count) => {
        Airplane.find()
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

import * as express from 'express'
const Airplane = require('../models/airplane')

export const get = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const page = req.query.page !== undefined && parseInt(req.query.page, 10) || 0
    const limit = req.query.limit !== undefined && parseInt(req.query.limit, 10) || 20

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

export const search = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const page = req.query.page !== undefined && parseInt(req.query.page, 10) || 0
    const limit = req.query.limit !== undefined && parseInt(req.query.limit, 10) || 20
    const search = req.query.searchText && `${req.query.searchText[0].toUpperCase()}${req.query.searchText.slice(1)}`

    if (!search) {
        res.status(204).json({ message: 'No content' })
    }

    Airplane.countDocuments({ title: { $regex: search }}, (err, count) => {
        Airplane.find({ title: { $regex: search }})
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

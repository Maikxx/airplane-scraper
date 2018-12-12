import { MongoError } from 'mongodb'
import { Response } from 'express'

export const onError = (error: MongoError, response: Response) => {
    response.status(500).json(error)

    return null
}

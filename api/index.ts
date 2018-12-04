import { connectToMongoAtlas } from './db/conntect'

if (process.env.NODE !== 'production') {
    require('dotenv').load()
}

import * as helmet from 'helmet'
import * as express from 'express'
import * as util from 'util'
import * as http from 'http'

import airplaneRoutes from './routes/airplanes'

const { promisify } = util

const port = process.env.PORT

; (async () => {
    const baseUrl = `localhost:${port}`
    console.log(`API Endpoint: ${baseUrl}/api/`)

    connectToMongoAtlas()

    const app = express()
    app.use(helmet())

    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

        if (req.method === 'OPTIONS') {
            res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({})
        }
        next()
    })

    app.use('/api/airplanes', airplaneRoutes)

    // app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    //     const error = new Error('Route not found!')
    //     error.name = 'RouteError'
    //     next(error)
    // })

    ; (async () => {
        const server = http.createServer(app)
        await promisify(server.listen.bind(server))(port)
    })()
})()

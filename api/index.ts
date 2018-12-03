import { connectToMongoAtlas } from './db/conntect'

if (process.env.NODE !== 'production') {
    require('dotenv').load()
}

// import * as helmet from 'helmet'
// import * as express from 'express'

const port = process.env.PORT

; (async () => {
    const baseUrl = `localhost:${port}`
    console.log(`API Endpoint: ${baseUrl}/api/`)

    connectToMongoAtlas()
})()

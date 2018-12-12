import * as mongoose from 'mongoose'

export const connectToMongoAtlas = (): void => {
    const connectionLink = `mongodb://${process.env.MONGO_ATLAS_NAME}:${process.env.MONGO_ATLAS_PW}${process.env.MONGO_ATLAS_CLUSTER}`

    mongoose.connect(connectionLink, { useNewUrlParser: true })
}

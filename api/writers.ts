import * as util from 'util'
import * as fs from 'fs'

const { promisify } = util
const writeFile = promisify(fs.writeFile)

export const writeScrapedData = async data => {
    await writeFile(`data/planes.json`, JSON.stringify(data))
}

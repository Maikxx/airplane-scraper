import * as cheerio from 'cheerio'

export const getQueryOptions = (url: string) => {
    return {
        uri: url,
        transform: body => cheerio.load(body),
    }
}

import * as cheerio from 'cheerio'

export const getQueryOptions = (url: string) => ({
    uri: url,
    transform: (html: string) => cheerio.load(html),
})

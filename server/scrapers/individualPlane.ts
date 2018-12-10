import * as request from 'request-promise'
import { cleanText, capitalizeFirstLetter } from '../transformers'
import { getQueryOptions } from '../queries'
import { dataFile } from '../..'

const scrapeTitle = scraper => {
    const title = scraper('#firstHeading').text()

    return cleanText(title)
}

const scrapeImageSrc = scraper => {
    const src = scraper('.infobox img:first-child')
        .attr('src')

    return src
        ? src.replace('//upload', 'https://upload')
        : undefined
}

const scrapeRole = scraper => {
    const role = scraper('.infobox th:contains("Role")')
        .next()
        .text()

    if (!role) {
        return undefined
    }

    const cleanRole = cleanText(role)

    return cleanRole
        ? capitalizeFirstLetter(cleanRole)
        : role
}

const scrapeOrigin = scraper => {
    const origin = scraper('.infobox th:contains("origin")')
        .next()
        .text()
    const cleanOrigin = cleanText(origin)

    return cleanOrigin
        ? capitalizeFirstLetter(cleanOrigin)
        : undefined
}

const scrapeManufacturer = scraper => {
    const manufacturedBy = scraper('.infobox th:contains("Manufacturer"),.infobox th:contains("Built by")')
        .next()
        .text()
    const cleanManufacturedBy = cleanText(manufacturedBy)

    return cleanManufacturedBy
        ? capitalizeFirstLetter(cleanManufacturedBy)
        : undefined
}

const scrapeFirstFlightDate = scraper => {
    const firstFlightDate = scraper('.infobox th:contains("First flight")')
        .next()
        .text()
    const cleanFirstFlightDate = cleanText(firstFlightDate)

    return cleanFirstFlightDate
        ? capitalizeFirstLetter(cleanFirstFlightDate)
        : undefined
}

const scrapeUsageStatus = scraper => {
    const usageStatus = scraper('.infobox th:contains("Status")')
        .next()
        .text()
    const retirementYear = scraper('.infobox th:contains("Retired")')
        .next()
        .text()

    if (!usageStatus) {
        if (retirementYear) {
            return `Retired (${retirementYear})`
        }

        return undefined
    }

    const cleanUsageStatus = cleanText(usageStatus)

    return cleanUsageStatus
        ? capitalizeFirstLetter(cleanUsageStatus)
        : undefined
}

const scrapePrimaryUsers = scraper => {
    const primaryUsers = scraper('.infobox th:contains("users")')
        .next()
        .find('a')
            .map((i, el) => scraper(el).text()).get()

    if (!primaryUsers.length) {
        const primaryUser = scraper('.infobox th:contains("user")')
            .next()
            .text()

        const cleanPrimaryUser = primaryUser && cleanText(primaryUser)

        return cleanPrimaryUser
            ? [capitalizeFirstLetter(cleanPrimaryUser)]
            : undefined
    }

    return primaryUsers.length > 0
        ? primaryUsers.map(primaryUser => cleanText(primaryUser))
        : undefined
}

const scrapeProductionYears = scraper => {
    const productionYears = scraper('.infobox th:contains("Produced")')
        .next()
        .text()
    const cleanProductionYears = cleanText(productionYears)

    return cleanProductionYears
        ? capitalizeFirstLetter(cleanProductionYears)
        : undefined
}

const scrapeBuiltNumber = scraper => {
    const amountBuilt = scraper('.infobox th:contains("built")')
        .next()
        .text()
    const cleanAmountBuilt = cleanText(amountBuilt)

    return cleanAmountBuilt
        ? capitalizeFirstLetter(cleanAmountBuilt)
        : undefined
}

export const scrapeAirplanePage = async (url: string) => {
    try {
        const scraper = await request(getQueryOptions(url))

        const data = {
            title: scrapeTitle(scraper),
            imageSrc: scrapeImageSrc(scraper),
            role: scrapeRole(scraper),
            origin: scrapeOrigin(scraper),
            manufacturedBy: scrapeManufacturer(scraper),
            firstFlight: scrapeFirstFlightDate(scraper),
            usageStatus: scrapeUsageStatus(scraper),
            primaryUsers: scrapePrimaryUsers(scraper),
            productionYears: scrapeProductionYears(scraper),
            amountBuilt: scrapeBuiltNumber(scraper),
        }

        const lowerCaseTitle = data.title.toLowerCase()

        const shouldIgnoreItem = lowerCaseTitle.includes('talk')
            || lowerCaseTitle.includes('list of')

        if (shouldIgnoreItem) {
            return null
        }

        const jsonData = JSON.stringify(data)

        dataFile.write(`,${jsonData}`)
    } catch (error) {
        console.error(error)
    }
}

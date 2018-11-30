import * as request from 'request-promise'
import { cleanText, convertToNumber } from '../transformers'
import { getQueryOptions } from '../queries'
import { dataFile } from '../..'

const scrapeTitle = scraper => {
    const title = scraper('#firstHeading').text()

    return cleanText(title)
}

const scrapeRole = scraper => {
    const role = scraper('.infobox th:contains("Role")')
        .next()
        .text()

    if (!role) {
        return undefined
    }

    const cleanRole = cleanText(role)

    if (!cleanRole) {
        return role
    }

    return `${cleanRole[0].toUpperCase()}${cleanRole.substr(1)}`
}

const scrapeOrigin = scraper => {
    const origin = scraper('.infobox th:contains("origin")')
        .next()
        .text()
    const cleanOrigin = cleanText(origin)

    return cleanOrigin
        ? cleanOrigin
        : undefined
}

const scrapeManufacturer = scraper => {
    const manufacturedBy = scraper('.infobox th:contains("Manufacturer"),.infobox th:contains("Built by")')
        .next()
        .text()
    const cleanManufacturedBy = cleanText(manufacturedBy)

    return cleanManufacturedBy
        ? cleanManufacturedBy
        : undefined
}

const scrapeFirstFlightDate = scraper => {
    const firstFlightDate = scraper('.infobox th:contains("First flight")')
        .next()
        .text()
    const cleanFirstFlightDate = cleanText(firstFlightDate)

    return cleanFirstFlightDate
        ? cleanFirstFlightDate
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

    if (!cleanUsageStatus) {
        return undefined
    }

    return `${cleanUsageStatus[0].toUpperCase()}${cleanUsageStatus.substr(1)}`
}

const scrapePrimaryUsers = scraper => {
    const primaryUsers = scraper('.infobox th:contains("users")')
        .next()
        .find('a')
            .map((i, el) => scraper(el).text()).get()
    const primaryUser = scraper('.infobox th:contains("Primary user")')
        .next()
            .next()
            .text()

    if (!primaryUsers && primaryUser) {
        return [cleanText(primaryUser)]
    }

    return primaryUsers
        ? primaryUsers.map(primaryUser => cleanText(primaryUser))
        : undefined
}

const scrapeProductionYears = scraper => {
    const productionYears = scraper('.infobox th:contains("Produced")')
        .next()
        .text()
    const cleanProductionYears = cleanText(productionYears)

    return cleanProductionYears
        ? cleanProductionYears
        : undefined
}

const scrapeBuiltNumber = scraper => {
    const amountBuilt = scraper('.infobox th:contains("built")')
        .next()
        .text()
    const cleanAmountBuilt = cleanText(amountBuilt)

    return cleanAmountBuilt
        ? cleanAmountBuilt
        : undefined
}

const scrapeVariants = scraper => {
    const th = scraper('.infobox th:contains("Variants")')
    const variants = th
        .next()
        .find('a')
            .map((i, el) => scraper(el).text()).get()

    return variants
        ? variants.map(variant => cleanText(variant))
        : undefined
}

const scrapeDevelopedInto = scraper => {
    const th = scraper('.infobox th:contains("Developed into")')
    const planeNames = th
        .next()
        .find('a')
            .map((i, el) => scraper(el).text()).get()

    return planeNames
        ? planeNames.map(planeName => cleanText(planeName))
        : undefined
}

export const scrapeAirplanePage = async (url: string) => {
    try {
        const scraper = await request(getQueryOptions(url))

        const data = {
            title: scrapeTitle(scraper),
            role: scrapeRole(scraper),
            origin: scrapeOrigin(scraper),
            manufacturedBy: scrapeManufacturer(scraper),
            firstFlight: scrapeFirstFlightDate(scraper),
            usageStatus: scrapeUsageStatus(scraper),
            primaryUsers: scrapePrimaryUsers(scraper),
            productionYears: scrapeProductionYears(scraper),
            amountBuilt: scrapeBuiltNumber(scraper),
            variants: scrapeVariants(scraper),
            developedInto: scrapeDevelopedInto(scraper),
        }

        console.log(data)

        if (data.title.includes('User talk')) {
            return
        }

        const jsonData = JSON.stringify(data)

        dataFile.write(`,${jsonData}`)
    } catch (error) {
        console.error(error)
    }
}

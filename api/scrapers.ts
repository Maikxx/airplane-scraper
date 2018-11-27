import { cleanText, convertToNumber } from './transformers'

const scrapeTitle = scraper => {
    const title = scraper('#firstHeading').text()

    return cleanText(title)
}

const scrapeRole = scraper => {
    const role = scraper('.infobox th:contains("Role")')
        .next()
        .text()

    return cleanText(role)
}

const scrapeOrigin = scraper => {
    const origin = scraper('.infobox th:contains("origin")')
        .next()
        .text()

    return cleanText(origin)
}

const scrapeManufacturer = scraper => {
    const manufacturedBy = scraper('.infobox th:contains("Manufacturer")')
        .next()
        .text()

    return cleanText(manufacturedBy)
}

const scrapeFirstFlightDate = scraper => {
    const firstFlightDate = scraper('.infobox th:contains("First flight")')
        .next()
        .text()

    return cleanText(firstFlightDate)
}

const scrapeUsageStatus = scraper => {
    const usageStatus = scraper('.infobox th:contains("Status")')
        .next()
        .text()

    return cleanText(usageStatus)
}

const scrapePrimaryUsers = scraper => {
    const th = scraper('.infobox th:contains("users")')
    const primaryUsers = th
        .next()
        .find('a')
            .map((i, el) => scraper(el).text()).get()

    return primaryUsers.map(primaryUser => cleanText(primaryUser))
}

const scrapeProductionYears = scraper => {
    const productionYears = scraper('.infobox th:contains("Produced")')
        .next()
        .text()

    return cleanText(productionYears)
}

const scrapeBuiltNumber = scraper => {
    const amountBuilt = scraper('.infobox th:contains("built")')
        .next()
        .text()
    const cleanedAmountBuilt = cleanText(amountBuilt.split('(')[0])

    return convertToNumber(cleanedAmountBuilt)
}

const scrapeVariants = scraper => {
    const th = scraper('.infobox th:contains("Variants")')
    const variants = th
        .next()
        .find('a')
            .map((i, el) => scraper(el).text()).get()

    return variants.map(variant => cleanText(variant))
}

const scrapeDevelopedInto = scraper => {
    const th = scraper('.infobox th:contains("Developed into")')
    const planeNames = th
        .next()
        .find('a')
            .map((i, el) => scraper(el).text()).get()

    return planeNames.map(planeName => cleanText(planeName))
}

export const getScrapedData = scraper => {
    return {
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
}

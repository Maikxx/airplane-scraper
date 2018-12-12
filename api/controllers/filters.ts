interface Query {
    limit?: string
    page?: string
    searchText?: string
    filters?: string
}

interface QueryFilters {
    filterByAirplaneHasImages?: boolean
    filterByAirplaneManufacturer?: string
    filterByAirplaneOrigin?: string
    filterByAirplaneRole?: string
    filterByAirplaneUsageStatus?: string
}

type ResetFilterType = 'all'

const getSearchFilter = (query: Query) => {
    const { searchText } = query
    const mongoSearchQuery = { title: { $regex: new RegExp(searchText, 'i') }}

    return { ...(searchText && mongoSearchQuery) }
}

const getAirplaneImageFilter = (parsedQueryFilters?: QueryFilters) => {
    const filterByAirplaneHasImages = parsedQueryFilters && parsedQueryFilters.filterByAirplaneHasImages
    const mongoFilterQuery = { imageSrc: { $exists: true, $ne: undefined }}

    return { ...(filterByAirplaneHasImages && mongoFilterQuery) }
}

const getRoleFilter = (parsedQueryFilters?: QueryFilters) => {
    const filterByAirplaneRole = parsedQueryFilters && parsedQueryFilters.filterByAirplaneRole
    const mongoFilterQuery = filterByAirplaneRole
        && filterByAirplaneRole !== 'all'
            ? { role: { $regex: new RegExp(filterByAirplaneRole, 'i') }}
            : {}

    return { ...(filterByAirplaneRole && mongoFilterQuery) }
}

const getOriginFilter = (parsedQueryFilters?: QueryFilters) => {
    const filterByAirplaneOrigin = parsedQueryFilters && parsedQueryFilters.filterByAirplaneOrigin
    const mongoFilterQuery = filterByAirplaneOrigin
        && filterByAirplaneOrigin !== 'all'
            ? { origin: { $regex: new RegExp(filterByAirplaneOrigin, 'i') }}
            : {}

    return { ...(filterByAirplaneOrigin && mongoFilterQuery) }
}

const getManufacturerFilter = (parsedQueryFilters?: QueryFilters) => {
    const filterByAirplaneManufacturer = parsedQueryFilters && parsedQueryFilters.filterByAirplaneManufacturer
    const mongoFilterQuery = filterByAirplaneManufacturer
        && filterByAirplaneManufacturer !== 'all'
            ? { manufacturedBy: { $regex: new RegExp(filterByAirplaneManufacturer, 'i') }}
            : {}

    return { ...(filterByAirplaneManufacturer && mongoFilterQuery) }
}

const getUsageStatusFilter = (parsedQueryFilters?: QueryFilters) => {
    const filterByAirplaneUsageStatus = parsedQueryFilters && parsedQueryFilters.filterByAirplaneUsageStatus
    const mongoFilterQuery = filterByAirplaneUsageStatus
        && filterByAirplaneUsageStatus !== 'all'
            ? { usageStatus: { $regex: new RegExp(filterByAirplaneUsageStatus, 'i') }}
            : {}

    return { ...(filterByAirplaneUsageStatus && mongoFilterQuery) }
}

export const getQueryFilters = (query: Query, parsedQueryFilters?: QueryFilters) => {
    return {
        ...getSearchFilter(query),
        ...getAirplaneImageFilter(parsedQueryFilters),
        ...getRoleFilter(parsedQueryFilters),
        ...getOriginFilter(parsedQueryFilters),
        ...getManufacturerFilter(parsedQueryFilters),
        ...getUsageStatusFilter(parsedQueryFilters),
    }
}

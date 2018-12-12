import { Airplane } from '../types/Airplane'

interface AirplaneQueryOptions {
    limit: number
    page: number
    searchText?: string
    filters?: AirplaneQueryFilters
}

export interface PaginatedQueryResults<NodeType> {
    hasNextPage?: boolean
    nodes?: NodeType[]
}

export interface AirplaneQueryFilters {
    filterByAirplaneHasImages?: boolean
    filterByAirplaneManufacturer?: string
    filterByAirplaneOrigin?: string
    filterByAirplaneRole?: string
    filterByAirplaneUsageStatus?: string
}

export const airplaneQuery = async ({ searchText, page, limit, filters }: AirplaneQueryOptions): Promise<PaginatedQueryResults<Airplane>> => {
    const urlBase = 'http://localhost:5000/api/airplanes'
    const searchTextParam = searchText
        ? `&searchText=${searchText}`
        : ''

    const filterParams = filters
        ? `&filters=${JSON.stringify(filters)}`
        : ''

    const url = `${urlBase}?limit=${limit}&page=${page}${searchTextParam}${filterParams}`
    const response = await fetch(url)
    return response.json()
}

export const rolesQuery = async (): Promise<string[]> => {
    const url = `http://localhost:5000/api/airplanes/roles`
    const response = await fetch(url)
    return response.json()
}

export const originsQuery = async (): Promise<string[]> => {
    const url = `http://localhost:5000/api/airplanes/origins`
    const response = await fetch(url)
    return response.json()
}

export const manufacturersQuery = async (): Promise<string[]> => {
    const url = `http://localhost:5000/api/airplanes/manufacturers`
    const response = await fetch(url)
    return response.json()
}

export const usageStatusesQuery = async (): Promise<string[]> => {
    const url = `http://localhost:5000/api/airplanes/usageStatuses`
    const response = await fetch(url)
    return response.json()
}

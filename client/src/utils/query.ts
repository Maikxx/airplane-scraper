import { Airplane } from '../types/Airplane'

interface QueryOptions {
    limit: number
    page: number
    searchText?: string
    filters?: QueryFilters
}

export interface PaginatedQueryResults<NodeType> {
    hasNextPage?: boolean
    nodes?: NodeType[]
}

export interface QueryFilters {
    filterByAirplaneHasImages?: boolean
}

export const query = async ({ searchText, page, limit, filters }: QueryOptions): Promise<PaginatedQueryResults<Airplane>> => {
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

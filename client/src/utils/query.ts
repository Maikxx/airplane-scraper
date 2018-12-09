import { Airplane } from '../types/Airplane'

interface QueryOptions {
    limit: number
    page: number
    searchText?: string
}

export interface PaginatedQueryResults<NodeType> {
    hasNextPage?: boolean
    nodes?: NodeType[]
}

export const query = async ({ searchText, page, limit }: QueryOptions): Promise<PaginatedQueryResults<Airplane>> => {
    const searchTextQueryUrlPart = searchText
        ? `&searchText=${searchText}`
        : ''

    const url = `http://localhost:5000/api/airplanes?limit=${limit}&page=${page}${searchTextQueryUrlPart}`
    const response = await fetch(url)
    return response.json()
}

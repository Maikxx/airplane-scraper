import * as React from 'react'
import { Airplane } from '../../types/Airplane'
import {
    airplaneQuery,
    AirplaneQueryFilters,
    rolesQuery,
    originsQuery,
    manufacturersQuery,
    usageStatusesQuery,
} from '../../utils/query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Page } from '../../components/Layout/Page/Page'
import { PageHeader } from '../../components/Layout/PageHeader/PageHeader'
import { AirplaneCard } from '../../components/Airplanes/AirplaneCard/AirplaneCard'
import { Loader } from '../../components/Core/Feedback/Loader/Loader'
import { AirplaneFilters } from '../../components/Airplanes/AirplaneFilters/AirplaneFilters'

interface Props {}

interface State {
    airplanes: Airplane[]
    filters?: AirplaneQueryFilters
    hasNextPage?: boolean
    loading: boolean
    manufacturers?: string[]
    origins?: string[]
    page: number
    roles?: string[]
    searchText?: string
}

export class AirplanesView extends React.Component<Props> {
    public state: State = {
        airplanes: [],
        filters: {},
        hasNextPage: undefined,
        loading: true,
        manufacturers: [],
        origins: [],
        page: 0,
        roles: [],
        searchText: '',
    }

    private limit = 20

    public async componentDidMount() {
        const { page } = this.state
        const roles = await rolesQuery()
        const origins = await originsQuery()
        const manufacturers = await manufacturersQuery()
        const usageStatuses = await usageStatusesQuery()
        const airplaneData = await airplaneQuery(this.getCurrentQueryOptions())

        this.setState({
            airplanes: airplaneData.nodes,
            hasNextPage: airplaneData.hasNextPage,
            loading: false,
            manufacturers,
            origins,
            page: page + 1,
            roles,
            usageStatuses,
        })
    }

    public render() {
        const {
            airplanes,
            hasNextPage,
            loading,
            manufacturers,
            roles,
            origins,
        } = this.state

        const canShowContent = !loading && !!airplanes

        return (
            <Page hasPageHeader={true}>
                <PageHeader onSearch={this.onSearch}/>
                <AirplaneFilters
                    manufacturers={manufacturers}
                    onChangeFilter={this.onFilter}
                    origins={origins}
                    roles={roles}
                />
                {!canShowContent && (
                    <Loader />
                )}
                {!!airplanes && (
                    <InfiniteScroll
                        dataLength={airplanes.length}
                        hasMore={hasNextPage}
                        next={this.fetchMoreData}
                        loader={<Loader />}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            margin: '-6px',
                            padding: '12px',
                        }}
                    >
                        {this.renderPlanes()}
                    </InfiniteScroll>
                )}
            </Page>
        )
    }

    private renderPlanes = () => {
        const { airplanes } = this.state

        return airplanes.map((airplane, i) => (
            <AirplaneCard
                airplane={airplane}
                key={i}
            />
        ))
    }

    private fetchMoreData = () => {
        const { airplanes, page, hasNextPage } = this.state

        if (hasNextPage) {
            this.setState({ loading: true }, async () => {
                const data = await airplaneQuery(this.getCurrentQueryOptions())

                this.setState({
                    airplanes: airplanes.concat(data.nodes),
                    hasNextPage: data.hasNextPage,
                    loading: false,
                    page: page + 1,
                })
            })
        }
    }

    private onSearch = (searchText?: string) => {
        this.setState({ airplanes: [], page: 0, loading: true, searchText }, async () => {
            const { page } = this.state
            const data = await airplaneQuery(this.getCurrentQueryOptions())

            this.setState({
                airplanes: data.nodes,
                hasNextPage: data.hasNextPage,
                loading: false,
                page: page + 1,
            })
        })
    }

    private onFilter = (filters: AirplaneQueryFilters) => {
        this.setState({ airplanes: [], page: 0, loading: true, filters }, async () => {
            const { page } = this.state
            const data = await airplaneQuery(this.getCurrentQueryOptions())

            this.setState({
                airplanes: data.nodes,
                hasNextPage: data.hasNextPage,
                loading: false,
                page: page + 1,
            })
        })
    }

    private getCurrentQueryOptions = () => {
        const { page, searchText, filters } = this.state

        return {
            limit: this.limit,
            page,
            searchText,
            filters,
        }
    }
}

import * as React from 'react'
import { Airplane } from '../../types/Airplane'
import { airplaneQuery, AirplaneQueryFilters } from '../../utils/query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Page } from '../../components/Layout/Page/Page'
import { PageHeader } from '../../components/Layout/PageHeader/PageHeader'
import { AirplaneCard } from '../../components/Airplanes/AirplaneCard/AirplaneCard'
import { Loader } from '../../components/Core/Feedback/Loader/Loader'
import { AirplaneFilters } from '../../components/Airplanes/AirplaneFilters/AirplaneFilters'

interface Props {}

interface State {
    airplanes: Airplane[]
    hasNextPage?: boolean
    loading: boolean
    page: number
    searchText?: string
    filters?: AirplaneQueryFilters
}

export class AirplanesView extends React.Component<Props> {
    public state: State = {
        airplanes: [],
        hasNextPage: undefined,
        loading: true,
        page: 0,
        searchText: '',
        filters: {},
    }

    private limit = 20

    public async componentDidMount() {
        const { page } = this.state
        const data = await airplaneQuery(this.getCurrentQueryOptions())

        this.setState({
            airplanes: data.nodes,
            hasNextPage: data.hasNextPage,
            loading: false,
            page: page + 1,
        })
    }

    public render() {
        const { airplanes, loading, hasNextPage } = this.state
        const canShowContent = !loading && !!airplanes

        return (
            <Page hasPageHeader={true}>
                <PageHeader onSearch={this.onSearch}/>
                <AirplaneFilters onChangeFilter={this.onFilter}/>
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

import * as React from 'react'
import { Airplane } from '../../types/Airplane'
import { Page } from '../../components/Layout/Page/Page'
import { PageHeader } from '../../components/Layout/PageHeader/PageHeader'
import { PlaneCard } from '../../components/Planes/PlaneCard/PlaneCard'
import { query } from '../../utils/query'
import CircularProgress from '@material-ui/core/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {}

interface State {
    airplanes: Airplane[]
    hasNextPage?: boolean
    loading: boolean
    page: number
    searchText?: string
}

export class AirplanesView extends React.Component<Props> {
    public state: State = {
        airplanes: [],
        hasNextPage: undefined,
        loading: true,
        page: 0,
        searchText: '',
    }

    private limit = 20

    public async componentDidMount() {
        const { page } = this.state
        const data = await query(this.getCurrentQueryOptions())

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
                {!canShowContent && (
                    <CircularProgress className={`asa-Loader`}/>
                )}
                {!!airplanes && (
                    <InfiniteScroll
                        dataLength={airplanes.length}
                        hasMore={hasNextPage}
                        next={this.fetchMoreData}
                        loader={<CircularProgress className={`asa-Loader`}/>}
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

    private fetchMoreData = () => {
        const { airplanes, page, hasNextPage } = this.state

        if (hasNextPage) {
            this.setState({ loading: true }, async () => {
                const data = await query(this.getCurrentQueryOptions())

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
            const data = await query(this.getCurrentQueryOptions())

            this.setState({
                airplanes: data.nodes,
                hasNextPage: data.hasNextPage,
                loading: false,
                page: page + 1,
            })
        })
    }

    private getCurrentQueryOptions = () => {
        const { page, searchText } = this.state

        return {
            limit: this.limit,
            page,
            searchText,
        }
    }

    private renderPlanes = () => {
        const { airplanes } = this.state

        return airplanes.map((airplane, i) => (
            <PlaneCard
                airplane={airplane}
                key={i}
            />
        ))
    }
}

import * as React from 'react'
import { Airplane } from '../types/Airplane'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PlaneCard } from '../components/Planes/PlaneCard/PlaneCard'
import { Page } from '../components/Layout/Page/Page'
import { PageHeader } from '../components/Layout/PageHeader/PageHeader'
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {}

interface State {
    airplanes: Airplane[]
    loading: boolean
    hasNextPage?: boolean
    page: number
    searchText?: string
}

export class RootView extends React.Component<Props, State> {
    public state: State = {
        airplanes: [],
        loading: true,
        hasNextPage: undefined,
        page: 0,
    }

    private limit = 20

    public async componentDidMount() {
        const { page } = this.state
        const { limit } = this

        const response = await fetch(`http://localhost:5000/api/airplanes?limit=${limit}&page=${page}`)
        const data = await response.json()

        this.setState({
            airplanes: data.nodes,
            loading: false,
            hasNextPage: data.hasNextPage,
            page: page + 1,
        })
    }

    public render() {
        const { airplanes, loading, hasNextPage } = this.state
        const canShowContent = !loading && !!airplanes

        return (
            <Page className={`asa-RootView`}>
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
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
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

    private queryData = async () => {
        const { searchText, page } = this.state
        const { limit } = this

        const hasSearchText = !!searchText
        const searchQueryUrlPart = hasSearchText ? '/search' : ''
        const searchTextQueryUrlPart = hasSearchText ? `&searchText=${searchText}` : ''
        const url = `http://localhost:5000/api/airplanes${searchQueryUrlPart}?limit=${limit}&page=${page}${searchTextQueryUrlPart}`
        const response = await fetch(url)
        return await response.json()
    }

    private fetchMoreData = () => {
        const { airplanes, page, hasNextPage } = this.state
        const { limit } = this

        if (hasNextPage) {
            this.setState({ loading: true }, async () => {
                const data = await this.queryData()

                this.setState({
                    airplanes: airplanes.concat(data.nodes),
                    loading: false,
                    hasNextPage: data.hasNextPage,
                    page: page + 1,
                })
            })
        }
    }

    private onSearch = async (searchText?: string) => {
        const { limit } = this

        await this.setState({ airplanes: [], page: 0, loading: true, searchText }, async () => {
            if (!searchText) {
                await this.queryData()
                return null
            }

            const { page } = this.state
            const response = await fetch(`http://localhost:5000/api/airplanes/search?limit=${limit}&page=${page}&searchText=${searchText}`)
            const data = await response.json()

            this.setState({
                airplanes: data.nodes,
                loading: false,
                hasNextPage: data.hasNextPage,
                page: page + 1,
            })
        })
    }

    private renderPlanes = () => {
        const { airplanes } = this.state

        return airplanes.map(this.renderPlane)
    }

    private renderPlane = (airplane: Airplane, i: number) => {
        return (
            <PlaneCard airplane={airplane} key={i}/>
        )
    }
}

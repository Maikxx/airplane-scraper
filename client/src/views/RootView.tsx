import * as React from 'react'
import { Airplane } from '../types/Airplane'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PlaneCard } from '../components/Planes/PlaneCard/PlaneCard'
import { PlaneGrid } from '../components/Planes/PlaneGrid/PlaneGrid'
import { Page } from '../components/Layout/Page/Page'
import { PageHeader } from '../components/Layout/PageHeader/PageHeader'

interface Props {}

interface State {
    airplanes: Airplane[]
    filteredAirplanes: Airplane[]
    loading: boolean
}

export class RootView extends React.Component<Props, State> {
    public state: State = {
        airplanes: [],
        filteredAirplanes: [],
        loading: true,
    }

    public async componentDidMount() {
        const response = await fetch('https://raw.githubusercontent.com/Maikxx/airplane-scraper/master/data/planes.json')
        const data = await response.json()

        this.setState({ airplanes: data, loading: false })
    }

    public render() {
        const { airplanes, loading } = this.state
        const canShowContent = !loading && !!airplanes

        return (
            <Page className={`asa-RootView`}>
                <PageHeader onSearch={this.onSearch}/>
                {!canShowContent && (
                    <CircularProgress className={`asa-Loader`}/>
                )}
                {canShowContent && (
                    <PlaneGrid>
                        {this.renderPlanes()}
                    </PlaneGrid>
                )}
            </Page>
        )
    }

    private onSearch = (searchText?: string) => {
        const { airplanes } = this.state

        this.setState({ loading: true })

        if (!airplanes) {
            return null
        }

        const filteredAirplanes = airplanes.filter(airplane => {
            return airplane.title
                .toLowerCase()
                .includes(searchText.toLowerCase())
        })

        this.setState({ filteredAirplanes, loading: false })
    }

    private renderPlanes = () => {
        const { airplanes, filteredAirplanes } = this.state

        if (filteredAirplanes.length > 0) {
            return filteredAirplanes.map(this.renderPlane)
        }

        return airplanes.map(this.renderPlane)
    }

    private renderPlane = (airplane: Airplane, i: number) => {
        return (
            <PlaneCard airplane={airplane} key={i}/>
        )
    }
}

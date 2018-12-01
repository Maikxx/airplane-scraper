import * as React from 'react'
import { Airplane } from '../types/Airplane'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PlaneCard } from '../components/Planes/PlaneCard/PlaneCard'
import { PlaneGrid } from '../components/Planes/PlaneGrid/PlaneGrid'
import { Page } from '../components/Layout/Page'

interface Props {}

interface State {
    airplanes: Airplane[]
    loading: boolean
}

export class RootView extends React.Component<Props, State> {
    public state: State = {
        airplanes: [],
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
                {!canShowContent && (
                    <CircularProgress />
                )}
                {canShowContent && (
                    <PlaneGrid>
                        {this.renderPlanes()}
                    </PlaneGrid>
                )}
            </Page>
        )
    }

    private renderPlanes = () => {
        const { airplanes } = this.state

        return airplanes.map((airplane, i) => (
            <PlaneCard airplane={airplane} key={i}/>
        ))
    }
}

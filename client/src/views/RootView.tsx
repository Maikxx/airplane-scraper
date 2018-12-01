import * as React from 'react'
import { Airplane } from '../types/Airplane'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PlaneCard } from '../components/PlaneCard/PlaneCard'

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

        return (
            <div className={`asa-RootView`}>
                {loading && (
                    <CircularProgress />
                )}
                {!loading && airplanes && airplanes.map((airplane, i) => (
                    <PlaneCard airplane={airplane} key={i} />
                ))}
            </div>
        )
    }
}

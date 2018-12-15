import * as React from 'react'
import { Page } from '../components/Layout/Page/Page'
import { AirplanesView } from './Airplanes/AirplanesView'

interface Props {}

export class RootView extends React.Component<Props> {
    public render() {
        return (
            <Page>
                <AirplanesView />
            </Page>
        )
    }
}

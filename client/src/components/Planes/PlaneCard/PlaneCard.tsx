import './PlaneCard.scss'
import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { PlaneImage } from '../PlaneImage/PlaneImage'
import { Airplane } from '../../../types/Airplane'
import c from 'classnames'
import { PlaneInformationList } from '../PlaneInformation/PlaneInformationList'
import { PlaneInformationItem } from '../PlaneInformation/PlaneInformationItem'

interface Props {
    airplane: Airplane
    className?: string
}

export class PlaneCard extends React.Component<Props> {
    public render() {
        const { airplane } = this.props
        const airplaneInformation = [
            {
                label: 'Role',
                text: airplane.role,
            },
            {
                label: 'Origin',
                text: airplane.origin,
            },
            {
                label: 'Manufactured by',
                text: airplane.manufacturedBy,
            },
            {
                label: 'First flight date',
                text: airplane.firstFlight,
            },
            {
                label: 'Usage status',
                text: airplane.usageStatus,
            },
            {
                label: 'Primary users',
                text: airplane.primaryUsers,
            },
            {
                label: 'Production years',
                text: airplane.productionYears,
            },
            {
                label: 'Amount built',
                text: airplane.amountBuilt,
            },
        ]

        return (
            <Card className={this.getClassName()}>
                {airplane.imageSrc && (
                    <PlaneImage airplane={airplane}/>
                )}
                <CardContent>
                    <Typography gutterBottom={true} variant={`h5`} component={`h2`}>
                        {airplane.title}
                    </Typography>
                    <PlaneInformationList>
                        {airplaneInformation.map(info => (
                            <PlaneInformationItem key={info.label} content={info}/>
                        ))}
                    </PlaneInformationList>
                </CardContent>
            </Card>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-PlaneCard', {}, className)
    }
}

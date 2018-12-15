import './AirplaneCard.scss'
import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { AirplaneImage } from './AirplaneImage/AirplaneImage'
import { Airplane } from '../../../types/Airplane'
import c from 'classnames'
import { Content } from './Content/Content'
import { List } from '@material-ui/core'

interface Props {
    airplane: Airplane
    className?: string
}

export class AirplaneCard extends React.Component<Props> {
    public render() {
        const { airplane } = this.props
        const contents = [
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
                    <AirplaneImage airplane={airplane}/>
                )}
                <CardContent>
                    <Typography
                        component={`h2`}
                        gutterBottom={true}
                        variant={`h5`}
                    >
                        {airplane.title}
                    </Typography>
                    <List>
                        {contents.map(content => (
                            <Content
                                content={content}
                                key={content.label}
                            />
                        ))}
                    </List>
                </CardContent>
            </Card>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-AirplaneCard', {}, className)
    }
}

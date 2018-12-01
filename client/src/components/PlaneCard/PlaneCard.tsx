import './PlaneCard.scss'
import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { PlaneImage } from '../PlaneImage/PlaneImage'
import { Airplane } from '../../types/Airplane'

interface Props {
    airplane: Airplane
}

export class PlaneCard extends React.Component<Props> {
    public render() {
        const { airplane } = this.props

        return (
            <Card className={`asa-PlaneCard`}>
                <CardActionArea>
                    {airplane.imageSrc && (
                        <PlaneImage airplane={airplane}/>
                    )}
                    <CardContent>
                        <Typography gutterBottom={true} variant={`h5`} component={`h2`}>
                            {airplane.title}
                        </Typography>
                        <Typography component={`p`}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

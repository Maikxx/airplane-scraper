import './PlaneImage.scss'
import * as React from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import { Airplane } from '../../types/Airplane'

interface Props {
    airplane: Airplane
}

export class PlaneImage extends React.Component<Props> {
    public render() {
        const { airplane } = this.props

        return (
            <CardMedia
                image={airplane.imageSrc}
                title={airplane.title}
                className={`asa-PlaneImage`}
            />
        )
    }
}

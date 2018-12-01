import './PlaneImage.scss'
import * as React from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import { Airplane } from '../../../types/Airplane'
import c from 'classnames'

interface Props {
    airplane: Airplane
    className?: string
}

export class PlaneImage extends React.Component<Props> {
    public render() {
        const { airplane } = this.props

        return (
            <CardMedia
                image={airplane.imageSrc}
                title={airplane.title}
                className={this.getClassName()}
            />
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-PlaneImage', {}, className)
    }
}

import './AirplaneImage.scss'
import * as React from 'react'
import { Airplane } from '../../../types/Airplane'
import c from 'classnames'
import CardMedia from '@material-ui/core/CardMedia'

interface Props {
    airplane: Airplane
    className?: string
}

export class AirplaneImage extends React.Component<Props> {
    public render() {
        const { airplane } = this.props

        return (
            <CardMedia
                className={this.getClassName()}
                image={airplane.imageSrc}
                title={airplane.title}
            />
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-AirplaneImage', {}, className)
    }
}

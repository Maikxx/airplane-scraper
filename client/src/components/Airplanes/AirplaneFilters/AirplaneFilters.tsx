import './AirplaneFilters.scss'
import * as React from 'react'
import c from 'classnames'
import { Filters } from '../../DataEntry/Filters/Filters'

interface Props {
    className?: string
}

export class AirplaneFilters extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Filters className={this.getClassName()}>
                {children}
            </Filters>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-AirplaneFilters', {}, className)
    }
}

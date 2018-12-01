import './PlaneGrid.scss'
import * as React from 'react'
import c from 'classnames'

interface Props {
    className?: string
}

export class PlaneGrid extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <div className={this.getClassName()}>
                {children}
            </div>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-PlaneGrid', {}, className)
    }
}

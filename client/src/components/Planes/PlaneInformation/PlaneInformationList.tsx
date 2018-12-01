import './PlaneInformationList.scss'
import * as React from 'react'
import c from 'classnames'
import List from '@material-ui/core/List'

interface Props {
    className?: string
}

export class PlaneInformationList extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <List className={this.getClassName()}>
                {children}
            </List>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-PlaneInformationList', {}, className)
    }
}

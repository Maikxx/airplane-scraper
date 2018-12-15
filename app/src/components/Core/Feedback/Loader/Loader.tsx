import * as React from 'react'
import c from 'classnames'
import CircularProgress from '@material-ui/core/CircularProgress'

interface Props {
    className?: string
}

export class Loader extends React.PureComponent<Props> {
    public render() {
        return (
            <CircularProgress className={this.getClassName()}/>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-Loader', {}, className)
    }
}

import './PageHeader.scss'
import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import c from 'classnames'
import { Search } from '../../Core/Search/Search'

interface Props {
    className?: string
}

export class PageHeader extends React.Component<Props> {
    public render() {
        return (
            <AppBar position={`sticky`} className={this.getClassName()}>
                <Typography
                    component={`h1`}
                    variant={`h4`}
                    className={`asa-PageHeader__title`}
                >
                    Wikipedia Airplanes
                </Typography>
                <Search />
            </AppBar>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-PageHeader', {}, className)
    }
}

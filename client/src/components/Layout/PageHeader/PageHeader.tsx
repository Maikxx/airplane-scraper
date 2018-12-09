import './PageHeader.scss'
import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import c from 'classnames'
import { Search } from '../../DataEntry/Search/Search'

interface Props {
    className?: string
    onSearch: (searchText?: string) => void
}

export class PageHeader extends React.Component<Props> {
    public render() {
        const { onSearch } = this.props

        return (
            <AppBar
                className={this.getClassName()}
                position={`fixed`}
            >
                <Typography
                    className={`asa-PageHeader__title`}
                    component={`h1`}
                    variant={`h4`}
                >
                    Wikipedia Airplanes
                </Typography>
                <Search onSearch={onSearch}/>
            </AppBar>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-PageHeader', {}, className)
    }
}

import './PageHeader.scss'
import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import c from 'classnames'

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
                <div className={`asa-PageHeader__search`}>
                    <div className={`asa-PageHeader__search-icon`}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder={`Search for a plane`}
                        classes={{
                            input: `asa-PageHeader__input-input`,
                            root: `asa-PageHeader__input-root`,
                        }}
                    />
                </div>
            </AppBar>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-PageHeader', {}, className)
    }
}

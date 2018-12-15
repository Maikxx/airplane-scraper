import './Search.scss'
import * as React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import c from 'classnames'

interface Props {
    className?: string
    onSearch: (searchText?: string) => void
}

export class Search extends React.Component<Props> {
    public render() {
        return (
            <div className={this.getClassName()}>
                <div className={`asa-Search__search-icon`}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder={`Search for a plane`}
                    classes={{
                        input: `asa-Search__input-input`,
                        root: `asa-Search__input-root`,
                    }}
                    onKeyUp={this.onInputChange}
                />
            </div>
        )
    }

    private onInputChange = (event: React.KeyboardEvent) => {
        const { onSearch } = this.props
        const target = event.target as HTMLInputElement
        const { value } = target

        onSearch(value)
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-Search', {}, className)
    }
}

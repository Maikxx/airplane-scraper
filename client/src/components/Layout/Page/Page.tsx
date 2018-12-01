import './Page.scss'
import * as React from 'react'
import c from 'classnames'

interface Props {
    className?: string
}

export class Page extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <main className={this.getClassName()}>
                {children}
            </main>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-Page', {}, className)
    }
}

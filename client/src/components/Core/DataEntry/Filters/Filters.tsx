import './Filters.scss'
import * as React from 'react'
import { Accordion } from '../../Feedback/Accordion/Accordion'
import c from 'classnames'

interface Props {
    className?: string
}

export class Filters extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Accordion
                buttonText={`Filters`}
                className={this.getClassName()}
            >
                {children}
            </Accordion>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-Filters', {}, className)
    }
}

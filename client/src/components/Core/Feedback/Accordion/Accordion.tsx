import './Accordion.scss'
import * as React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FilterIcon from '@material-ui/icons/FilterList'
import Typography from '@material-ui/core/Typography'
import c from 'classnames'

interface Props {
    buttonText: string
    className?: string
}

interface State {
    isExpanded: boolean
}

export class Accordion extends React.Component<Props, State> {
    public state: State = {
        isExpanded: false,
    }

    public render() {
        const { buttonText, children } = this.props

        return (
            <ExpansionPanel
                className={this.getClassName()}
                onChange={this.onChange}
            >
                <ExpansionPanelSummary
                    className={`asa-Accordion__header`}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <FilterIcon className={`asa-Accordion__icon`}/>
                    <Typography
                        className={`asa-Accordion__text`}
                        variant={`subheading`}
                    >
                        {buttonText}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={`asa-Accordion__content`}>
                    {children}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }

    private onChange = (event: any, expanded: boolean) => {
        this.setState({ isExpanded: expanded })
    }

    private getClassName = () => {
        const { className } = this.props
        const { isExpanded } = this.state

        return c('asa-Accordion', {
            'asa-Accordion--is-expanded': isExpanded,
        }, className)
    }
}

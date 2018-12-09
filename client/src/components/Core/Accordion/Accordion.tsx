import './Accordion.scss'
import * as React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import c from 'classnames'

interface Props {
    buttonText: string
    className?: string
}

export class Accordion extends React.Component<Props> {
    public render() {
        const { buttonText, children } = this.props

        return (
            <ExpansionPanel className={this.getClassName()}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        {buttonText}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {children}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-Accordion', {}, className)
    }
}

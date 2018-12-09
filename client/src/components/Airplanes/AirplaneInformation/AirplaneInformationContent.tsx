import './AirplaneInformationContent.scss'
import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import c from 'classnames'

interface AirplaneInformationContentInner {
    label: string
    text?: string | string[]
}

interface Props {
    className?: string
    content: AirplaneInformationContentInner
}

export class AirplaneInformationContent extends React.Component<Props> {
    public render() {
        const { content } = this.props
        const { label, text } = content
        const textShouldBeNewList = Array.isArray(text) && text.length > 1

        if (!text) {
            return null
        }

        return (
            <ListItem className={this.getClassName()}>
                {!textShouldBeNewList && (
                    <ListItemText
                        primary={label}
                        secondary={text}
                    />
                )}
                {textShouldBeNewList && (
                    <List className={`asa-AirplaneInformationContent__nested-list`}>
                        <ListItem className={`asa-AirplaneInformationContent__nested-list-item`}>
                            <ListItemText primary={label}/>
                        </ListItem>
                        {Array.isArray(text) && text.map((t, i) => (
                            <ListItem
                                className={`asa-AirplaneInformationContent__nested-list-item`}
                                key={i}
                            >
                                <ListItemText secondary={t}/>
                            </ListItem>
                        ))}
                    </List>
                )}
            </ListItem>
        )
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-AirplaneInformationContent', {}, className)
    }
}

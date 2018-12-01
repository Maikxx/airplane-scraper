import './PlaneInformationItem.scss'
import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import c from 'classnames'

interface PlaneInformationItemContent {
    label: string
    text?: string | string[]
}

interface Props {
    content: PlaneInformationItemContent
    className?: string
}

export class PlaneInformationItem extends React.Component<Props> {
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
                    <List className={`asa-PlaneInformationItem__nested-list`}>
                        <ListItem className={`asa-PlaneInformationItem__nested-list-item`}>
                            <ListItemText primary={label}/>
                        </ListItem>
                        {Array.isArray(text) && text.map((t, i) => (
                            <ListItem key={i} className={`asa-PlaneInformationItem__nested-list-item`}>
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

        return c('asa-PlaneInformationItem', {}, className)
    }
}

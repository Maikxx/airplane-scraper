import './Content.scss'
import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import c from 'classnames'

interface ContentInner {
    label: string
    text?: string | string[]
}

interface Props {
    className?: string
    content: ContentInner
}

export class Content extends React.PureComponent<Props> {
    public render() {
        const { content } = this.props
        const { label, text } = content
        const textShouldBeNewList = Array.isArray(text) && text.length > 1

        if (!text || !text.length || text === '\n') {
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
                    <List className={`asa-Content__nested-list`}>
                        <ListItem className={`asa-Content__nested-list-item`}>
                            <ListItemText primary={label}/>
                        </ListItem>
                        {Array.isArray(text) && text.map((t, i) => (
                            <ListItem
                                className={`asa-Content__nested-list-item`}
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

        return c('asa-Content', {}, className)
    }
}

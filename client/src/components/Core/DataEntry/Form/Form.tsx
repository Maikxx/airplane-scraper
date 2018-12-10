import './Form.scss'
import * as React from 'react'
import c from 'classnames'

type FormAutoCapitalizeType = 'none' | 'sentences' | 'words' | 'characters'
type FormAutoCompleteType = 'off' | 'on'
type FormEncTypeType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
type FormMethodType = 'post' | 'get' | 'dialog'
type FormTarget = '_self' | '_blank' | '_parent' | '_top' | string

interface Props {
    action?: string
    acceptCharset?: string
    autoCapitalize?: FormAutoCapitalizeType
    autocomplete?: FormAutoCompleteType
    encType?: FormEncTypeType
    className?: string
    method?: FormMethodType
    name?: string
    noValidate?: boolean
    onChange?: React.ChangeEventHandler<HTMLFormElement>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    shouldPreventDefault?: boolean
    target?: FormTarget
}

export class Form extends React.Component<Props> {
    public static defaultProps = {
        shouldPreventDefault: true,
    }

    public render() {
        const { children, className, shouldPreventDefault, onSubmit, ...restProps } = this.props

        return (
            <form
                className={this.getClassName()}
                onSubmit={this.onSubmit}
                {...restProps}
            >
                {children}
            </form>
        )
    }

    private onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
        const { shouldPreventDefault, onSubmit } = this.props

        if (shouldPreventDefault) {
            event.preventDefault()
        }

        if (onSubmit) {
            onSubmit(event)
        }
    }

    private getClassName = () => {
        const { className } = this.props

        return c('asa-Form', {}, className)
    }
}

import * as React from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { truncateString } from '../../../../utils/string'

interface Props {
    className?: string
    onChange?: (name: string, value: string | number) => void
    origins?: string[]
}

interface State {
    currentValue: string | number
}

export class OriginFilter extends React.Component<Props, State> {
    public state: State = {
        currentValue: '',
    }

    public render() {
        const { className, origins } = this.props

        if (!origins || !origins.length) {
            return null
        }

        return (
            <FormControl className={className}>
                <InputLabel htmlFor={`filterByAirplaneOrigin`}>
                    Origin
                </InputLabel>
                {this.renderControl(origins)}
            </FormControl>
        )
    }

    private renderControl = (origins: string[]) => {
        const { currentValue } = this.state

        return (
            <NativeSelect
                value={currentValue}
                onChange={this.onChange}
                input={<Input name={`filterByAirplaneOrigin`} id={`filterByAirplaneOrigin`} />}
            >
                <option value={``} disabled={true}/>
                {origins
                    .map((origin: string, i: number) => (
                        <option key={i} value={origin}>
                            {truncateString(origin, 25)}
                        </option>
                    ))
                }
            </NativeSelect>
        )
    }

    private onChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
        const { onChange } = this.props

        const { value } = event.target

        this.setState({ currentValue: value }, () => {
            if (onChange) {
                onChange('filterByAirplaneOrigin', value)
            }
        })
    }
}

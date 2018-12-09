import * as React from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

interface Props {
    className?: string
    onChange?: (name: string, value: string | number) => void
}

interface State {
    currentValue: string | number
}

export class RoleFilter extends React.Component<Props, State> {
    public state: State = {
        currentValue: '',
    }

    public render() {
        const { className } = this.props

        return (
            <FormControl className={className}>
                <InputLabel htmlFor={`filterByAirplaneRole`}>
                    Role
                </InputLabel>
                {this.renderControl()}
            </FormControl>
        )
    }

    private renderControl = () => {
        const { currentValue } = this.state

        return (
            <NativeSelect
                value={currentValue}
                onChange={this.onChange}
                input={<Input name={`filterByAirplaneRole`} id={`filterByAirplaneRole`} />}
            >
                <option value={``} disabled={true}/>
                <option value={10}>
                    Ten
                </option>
                <option value={20}>
                    Twenty
                </option>
                <option value={30}>
                    Thirty
                </option>
            </NativeSelect>
        )
    }

    private onChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
        const { onChange } = this.props

        const { value } = event.target
        console.log(value)

        this.setState({ currentValue: value }, () => {
            if (onChange) {
                onChange('filterByAirplaneRole', value)
            }
        })
    }
}

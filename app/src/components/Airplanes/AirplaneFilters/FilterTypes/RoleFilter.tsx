import * as React from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { truncateString } from '../../../../utils/string'

interface Props {
    className?: string
    onChange?: (name: string, value: string | number) => void
    roles?: string[]
}

interface State {
    currentValue: string | number
}

export class RoleFilter extends React.Component<Props, State> {
    public state: State = {
        currentValue: '',
    }

    public render() {
        const { className, roles } = this.props

        if (!roles || !roles.length) {
            return null
        }

        return (
            <FormControl className={className}>
                <InputLabel htmlFor={`filterByAirplaneRole`}>
                    Role
                </InputLabel>
                {this.renderControl(roles)}
            </FormControl>
        )
    }

    private renderControl = (roles: string[]) => {
        const { currentValue } = this.state

        return (
            <NativeSelect
                value={currentValue}
                onChange={this.onChange}
                input={<Input name={`filterByAirplaneRole`} id={`filterByAirplaneRole`} />}
            >
                <option value={``} disabled={true}/>
                <option value={`all`}>
                    All roles
                </option>
                {roles
                    .sort()
                    .map((role: string, i: number) => (
                        <option key={i} value={role}>
                            {truncateString(role, 25)}
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
                onChange('filterByAirplaneRole', value)
            }
        })
    }
}

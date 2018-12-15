import * as React from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

interface Props {
    className?: string
    onChange?: (name: string, value: string) => void
    usageStatuses?: string[]
}

interface State {
    currentValue: string
}

export class UsageStatusFilter extends React.Component<Props, State> {
    public state: State = {
        currentValue: '',
    }

    public render() {
        const { className, usageStatuses } = this.props

        if (!usageStatuses || !usageStatuses.length) {
            return null
        }

        return (
            <FormControl className={className}>
                <InputLabel htmlFor={`filterByAirplaneUsageStatus`}>
                    Usage status
                </InputLabel>
                {this.renderControl(usageStatuses)}
            </FormControl>
        )
    }

    private renderControl = (usageStatuses: string[]) => {
        const { currentValue } = this.state

        return (
            <NativeSelect
                value={currentValue}
                onChange={this.onChange}
                input={<Input name={`filterByAirplaneUsageStatus`} id={`filterByAirplaneUsageStatus`} />}
            >
                <option value={``} disabled={true}/>
                <option value={`all`}>
                    All usage statuses
                </option>
                {usageStatuses
                    .sort()
                    .map((usageStatus: string, i: number) => (
                        <option key={i} value={usageStatus}>
                            {usageStatus}
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
                onChange('filterByAirplaneUsageStatus', value)
            }
        })
    }
}

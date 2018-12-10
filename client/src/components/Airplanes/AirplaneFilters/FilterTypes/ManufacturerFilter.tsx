import * as React from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { truncateString } from '../../../../utils/string'

interface Props {
    className?: string
    onChange?: (name: string, value: string | number) => void
    manufacturers?: string[]
}

interface State {
    currentValue: string | number
}

export class ManufacturerFilter extends React.Component<Props, State> {
    public state: State = {
        currentValue: '',
    }

    public render() {
        const { className, manufacturers } = this.props

        if (!manufacturers || !manufacturers.length) {
            return null
        }

        return (
            <FormControl className={className}>
                <InputLabel htmlFor={`filterByAirplaneManufacturer`}>
                    Manufactured by
                </InputLabel>
                {this.renderControl(manufacturers)}
            </FormControl>
        )
    }

    private renderControl = (manufacturers: string[]) => {
        const { currentValue } = this.state

        return (
            <NativeSelect
                value={currentValue}
                onChange={this.onChange}
                input={<Input name={`filterByAirplaneManufacturer`} id={`filterByAirplaneManufacturer`} />}
            >
                <option value={``} disabled={true}/>
                {manufacturers
                    .filter(manufacturer => manufacturer.length > 0)
                    .map((manufacturer: string, i: number) => (
                        <option key={i} value={manufacturer}>
                            {truncateString(manufacturer, 25)}
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
                onChange('filterByAirplaneManufacturer', value)
            }
        })
    }
}

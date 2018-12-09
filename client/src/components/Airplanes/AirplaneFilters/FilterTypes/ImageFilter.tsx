import * as React from 'react'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

interface Props {
    onChange?: (name: string, checked: boolean) => void
}

interface State {
    isChecked: boolean
}

export class ImageFilter extends React.Component<Props, State> {
    public state: State = {
        isChecked: false,
    }

    public render() {
        return (
            <FormControlLabel
                control={this.renderControl()}
                label={`Has image`}
                labelPlacement={`start`}
            />
        )
    }

    private renderControl = () => {
        const { isChecked } = this.state

        return (
            <Switch
                checked={isChecked}
                name={`filterByAirplaneHasImages`}
                onChange={this.onChange}
            />
        )
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const { onChange } = this.props

        this.setState({ isChecked: checked }, () => {
            if (onChange) {
                onChange('filterByAirplaneHasImages', checked)
            }
        })
    }
}
